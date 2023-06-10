import { placeToLatLngWithName , latLngToPlaceWithName} from '../../../utils/transformers';
import { isJsonResponseValid } from '../../../utils/restfulAPI';
import { updateUnits } from '../../../utils/inputters';
import  * as tripFile  from '../../../../schemas/tripFile.json';
import { requestDistanceResults } from '../../../utils/requests/distancesRequest';
import { loadSelectedUnit } from '../../../utils/loaders';

export async function saveItinerary(fileText, fileName, fileType) {
    fileText = makeJSONFollowSchema(fileText);
    if (fileType === 'text/csv'){
        fileText = JSONtoCSV(fileText);
    }
    if (fileType === 'image/svg+xml'){
        fileText = saveAsSVG(fileText);
    }
    if (fileType === 'application/vnd.google-earth.kml+xml'){
        fileText = saveAsKML(fileText, fileName);
    }
    let file = new Blob([fileText], {type: fileType});
    let a = document.createElement('a'),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
    return (fileText);
}

export function parseFile(file, places, placeActions){
    let reader = new FileReader();
    let extension = file.name.split(".").pop().toLowerCase();

    reader.onloadend = () => {
        return whichFileType(extension, reader.result, places, placeActions);
    }
    reader.readAsText(file);
}

export function whichFileType(extension, result, places, placeActions){
    if (extension == "json") { 
        return createTripFromJSON(result, places, placeActions); 
    }
    else if (extension == "csv") {
        return csvToJSON(result, places, placeActions); 
    }
    else { 
        alert("File extension not supported, use .json or .csv"); 
        return false;
    }
}

export function createTripFromJSON(content, places, placeActions){
    let jsonResult = validateTripFileSchema(content)
    if (jsonResult==false) return;
    places.length = 0;
    placeActions.selectIndex(-1);
    if(jsonResult.units) {
        dealWithUnits(places, placeActions, jsonResult)
    }
    for (let i = 0; i < jsonResult.places.length; i++){
    places.push(placeToLatLngWithName(jsonResult.places[i]))
    }
    requestDistanceResults(places, loadSelectedUnit());
    placeActions.selectIndex(0);
    return places;
}

export function csvToJSON(content, places, placeActions){
    var lines = content.split('\n');
    var result = []
    var headers = lines[0].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    if (headers.includes("\"units\"")){
        dealWithUnits(places, placeActions, headers, lines[1].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/))
    }
    for (let i = 1; i < lines.length; i++){
        var place = {};
        var currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
        result = formatCSV(place, currentline, result, headers)
    }
    createTripFromJSON(JSON.stringify({places: result}), places, placeActions);
    return result;
}

export function makeJSONFollowSchema(fileText){
    fileText = JSON.parse(fileText);
    for (let i = 0; i < fileText.length; i++){
        fileText[i] = latLngToPlaceWithName(fileText[i])
    }
    return JSON.stringify({earthRadius: parseInt(loadSelectedUnit().value), units: loadSelectedUnit().unit, places: fileText});
}

export function validateTripFileSchema(content){
    let jsonResult;
    try{
        jsonResult = JSON.parse(content);
    }catch(error){
        alert(error);
        return false;
    }
    if (!isJsonResponseValid(jsonResult, tripFile)){
        alert("JSON file schema was not valid");
        return false;
    }
    return jsonResult
}

export function JSONtoCSV(fileText){
    fileText = JSON.parse(fileText);
    const places = fileText.places
    let header = ["\"earthRadius\"","\"units\"","\"latitude\"", "\"longitude\"", "\"name\"\n"]
    let csv = []
    for (let i = 0; i<places.length-1; i++){
        header = header + [`${loadSelectedUnit().value}`,`"${loadSelectedUnit().unit}"`,`"${places[i].latitude}"`,`"${places[i].longitude}"`,`"${places[i].name}\"\n`];
    }
    header = header + [`${loadSelectedUnit().value}`,`"${loadSelectedUnit().unit}"`,`"${places[places.length-1].latitude}"`,`"${places[places.length-1].longitude}"`,`"${places[places.length-1].name}\"`];
    csv = header
    return csv
}

export function dealWithUnits(places, placeActions, content, line){
    const props = {places:places, placeActions:placeActions};
    if (Array.isArray(content)){
        updateUnits(props, {"unit": line[content.indexOf("\"units\"")].replace(/"/g,""), "value": parseInt(line[content.indexOf("\"earthRadius\"")])})
    }else{
        updateUnits(props, {"unit": content.units, "value": content.earthRadius})
    }
}

export function formatCSV(place, currentline,result,headers){
    var compareToHeader = ["name","latitude","longitude"]
    for(var j = 0; j < headers.length; j++){
        headers[j] = headers[j].replace(/"/g,"")
        if (compareToHeader.includes(headers[j])){
            place[headers[j]] = currentline[j].replace(/"/g,"");
        }
    }
    result.push(place)
    return result;
}

export function saveAsSVG(fileText){
    fileText = JSON.parse(fileText).places
    let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1024" height="512"><image href="https://instructor-uploaded-content.s3.amazonaws.com/MAP.svg-6983777"  width="1024" height="512" /><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1024" height="512" viewBox="-180 90 360 180">
        <defs><marker id='pointer' orient="auto" markerWidth='3' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill="black"/></marker></defs>
        <symbol id="begin" width="5" height="5" viewBox="0 0 321.883 321.883"><path fill ="#790FD0" d="M160.941,0c-69.035,0-125,55.964-125,125.001c0,69.035,85.187,196.882,125,196.882c39.813,0,125-127.847,125-196.882C285.941,55.964,229.977,0,160.941,0z M160.941,182.294c-36.341,0-65.801-29.46-65.801-65.802c0-36.34,29.46-65.801,65.801-65.801c36.341,0,65.801,29.461,65.801,65.801C226.742,152.834,197.282,182.294,160.941,182.294z"/></symbol><g id="mysvg2" transform="matrix(1,0,0,-1,0,180)">`
    for (let i = 0; i <fileText.length-1; i++){
        svg += `<line id="vertCenter" x1="${fileText[i].longitude}" y1="${fileText[i].latitude}" x2="${fileText[i+1].longitude}" y2="${fileText[i+1].latitude}" stroke="black" stroke-width=".85" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,3" marker-end="url(#pointer)"/>`
    }
    svg += `<line id="vertCenter" x1="${fileText[fileText.length-1].longitude}" y1="${fileText[fileText.length-1].latitude}" x2="${fileText[0].longitude}" y2="${fileText[0].latitude}" stroke="black" stroke-width=".85" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1,3" marker-end="url(#pointer)"/></g>
    <g transform="matrix(1,0,0,-1,0,180) translate(1.5,5.25) rotate(180, ${fileText[0].longitude}, ${fileText[0].latitude})"><use href="#begin" x="${fileText[0].longitude}"  y="${fileText[0].latitude}" style="opacity:1.0" /></g></svg></svg>` 
    return svg
}

export function saveAsKML(fileText, fileName){
    fileText = JSON.parse(fileText).places;
    let kml = `<?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
      <Document>
        <name>${fileName.split(".kml")[0]}</name>
        <open>1</open>
        <Style id="CrossStyle">
          <LineStyle><color>ffffffb6</color><width>4</width></LineStyle>
        </Style>
        <Placemark>
          <name>Cross-corner line</name>
          <styleUrl>#CrossStyle</styleUrl>
          <LineString>
          <coordinates> `
    for (let i = 0; i <fileText.length; i++){
        kml += `${fileText[i].longitude},${fileText[i].latitude},0 `
    }
    kml += `${fileText[0].longitude},${fileText[0].latitude},0 </coordinates>
    </LineString>
  </Placemark>
  </Document>
</kml>`
    return kml;
}
import { MOCK_PLACES } from "../../sharedMocks";
import { describe, expect, it, jest, shallow} from "@jest/globals";
import * as acts from '../../../src/components/Trip/Itinerary/fileSaveLoad';
import { EARTH_RADIUS_UNITS_DEFAULT } from '../../../src/utils/constants'

describe('inputters w/ input', () => {
    const fileContents = JSON.stringify({"earthRadius":20903520,"units":"feet","places":[{"latitude":"40.575051059755694","longitude":"-105.09479752371388","name":"Moby Arena Parking, Moby Drive, Fort Collins, Larimer County, Colorado, 80521-4524, United States"},{"latitude":"40.575604521207055","longitude":"-105.08185103116854","name":"Statistics Building, Isotope Drive, Fort Collins, Larimer County, Colorado, 80524-3714, United States"},{"latitude":"40.57211220635228","longitude":"-105.08806706235754","name":"Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States"}]});
    const latLngContents = [{"earthRadius":20903520,"units":"feet","name":"Moby Arena Parking, Moby Drive, Fort Collins, Larimer County, Colorado, 80521-4524, United States","lat":40.575051059755694,"lng":-105.09479752371388},{"name":"Statistics Building, Isotope Drive, Fort Collins, Larimer County, Colorado, 80524-3714, United States","lat":40.575604521207055,"lng":-105.08185103116854},{"name":"Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States","lat":40.57211220635228,"lng":-105.08806706235754}];
    const csvContents = "\"earthRadius\",\"units\",\"latitude\",\"longitude\",\"name\"\n" + "3959,\"miles\",\"40.575051059755694\",\"-105.09479752371388\",\"Moby Arena Parking, Moby Drive, Fort Collins, Larimer County, Colorado, 80521-4524, United States\"\n" + "3959,\"miles\",\"40.575604521207055\",\"-105.08185103116854\",\"Statistics Building, Isotope Drive, Fort Collins, Larimer County, Colorado, 80524-3714, United States\"\n" + "3959,\"miles\",\"40.57211220635228\",\"-105.08806706235754\",\"Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States\""
    const JSONafterConversion = [{"latitude": "40.575051059755694", "longitude": "-105.09479752371388", "name": "Moby Arena Parking, Moby Drive, Fort Collins, Larimer County, Colorado, 80521-4524, United States"}, {"latitude": "40.575604521207055", "longitude": "-105.08185103116854", "name": "Statistics Building, Isotope Drive, Fort Collins, Larimer County, Colorado, 80524-3714, United States"}, {"latitude": "40.57211220635228", "longitude": "-105.08806706235754", "name": "Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States"}]
    global.Blob = jest.fn();
    window.URL.createObjectURL = jest.fn();
    window.URL.revokeObjectURL = jest.fn();
    window.alert = jest.fn();

    const places={MOCK_PLACES, push: jest.fn()} 
    const placeActions={units: EARTH_RADIUS_UNITS_DEFAULT, append: jest.fn(), selectIndex : jest.fn()}
    it('validateTripFileSchema validates correctly', () => {
        let result = acts.validateTripFileSchema(fileContents);
        expect(result).toEqual(JSON.parse(fileContents));
    });
    it('validateTripFileSchema fails on bad schema', () => {
        const badSchema = JSON.stringify({"laces":[]});
        let result = acts.validateTripFileSchema(badSchema);
        expect(result).toEqual(JSON.parse(false));
    });
    it('validateTripFileSchema fails on invalid json file', () => {
        const weirdFile = ["Object object"];
        let result = acts.validateTripFileSchema(weirdFile);
        expect(result).toEqual(JSON.parse(false));
    });
    it('makeJSONfollowSchema converts places to latitude longitude', () => {
        const expected = "{\"earthRadius\":3959,\"units\":\"miles\",\"places\":[{\"name\":\"Moby Arena Parking, Moby Drive, Fort Collins, Larimer County, Colorado, 80521-4524, United States\",\"latitude\":\"40.575051059755694\",\"longitude\":\"-105.09479752371388\"},{\"name\":\"Statistics Building, Isotope Drive, Fort Collins, Larimer County, Colorado, 80524-3714, United States\",\"latitude\":\"40.575604521207055\",\"longitude\":\"-105.08185103116854\"},{\"name\":\"Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States\",\"latitude\":\"40.57211220635228\",\"longitude\":\"-105.08806706235754\"}]}";
        let result = acts.makeJSONFollowSchema(JSON.stringify(latLngContents));
        expect(result).toEqual(expected);
    });
    it('saveItinerary saves json correctly', () => {
        let result = acts.saveItinerary(JSON.stringify(latLngContents), 'myTrip', 'application/json');
        expect(result).toBeTruthy();
    });
    it('saveItinerary saves csv correctly', () => {
        let result = acts.saveItinerary(JSON.stringify(latLngContents), 'myTrip.csv', 'text/csv');
        expect(result).toBeTruthy();
    });
    it('saveItinerary saves svg correctly', () => {
        let result = acts.saveItinerary(JSON.stringify(latLngContents), 'myTrip.svg', 'image/svg+xml');
        expect(result).toBeTruthy();
    });
    it('makeCSVFollowSchema arranges file contents correctly', () => {
        let result = acts.JSONtoCSV(fileContents);
        expect(result).toEqual(csvContents);
    });
    it('csvToJSON converts correctly', () => {
        let result = acts.csvToJSON(csvContents, places, placeActions);
        expect(result).toEqual(JSONafterConversion);
    });
    it('whichFileType creates places from json correctly', () => {
        const expected = [{"lat": 40.575051059755694, "lng": -105.09479752371388, "name": "Moby Arena Parking, Moby Drive, Fort Collins, Larimer County, Colorado, 80521-4524, United States"}, {"lat": 40.575604521207055, "lng": -105.08185103116854, "name": "Statistics Building, Isotope Drive, Fort Collins, Larimer County, Colorado, 80524-3714, United States"}, {"lat": 40.57211220635228, "lng": -105.08806706235754, "name": "Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States"}]
        let empty = []
        let result = acts.whichFileType('json', fileContents, empty, placeActions);
        expect(result).toEqual(expected)
    });
    it('whichFileType creates places from csv correctly', () => {
        const expected = [{"lat": 40.575051059755694, "lng": -105.09479752371388, "name": "Moby Arena Parking, Moby Drive, Fort Collins, Larimer County, Colorado, 80521-4524, United States"}, {"lat": 40.575604521207055, "lng": -105.08185103116854, "name": "Statistics Building, Isotope Drive, Fort Collins, Larimer County, Colorado, 80524-3714, United States"}, {"lat": 40.57211220635228, "lng": -105.08806706235754, "name": "Colorado State University, South College Avenue, Fort Collins, Larimer County, Colorado, 80525-1725, United States"}]
        let empty = []
        let result = acts.whichFileType('csv', csvContents, empty, placeActions);
        expect(result).toEqual(JSONafterConversion)
    });
    it('whichFileType does not allow other filetypes', () => {
        let empty = []
        let result = acts.whichFileType('txt', empty, empty, placeActions);
        expect(result).toEqual(false)
    });
    it('saveAsSVG correctly returns svg filetext', () => {
        let svg = `<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1024\" height=\"512\"><image href=\"https://instructor-uploaded-content.s3.amazonaws.com/MAP.svg-6983777\"  width=\"1024\" height=\"512\" /><svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"1024\" height=\"512\" viewBox=\"-180 90 360 180\">
        <defs><marker id='pointer' orient=\"auto\" markerWidth='3' markerHeight='4' refX='0.1' refY='2'><path d='M0,0 V4 L2,2 Z' fill=\"black\"/></marker></defs>
        <symbol id=\"begin\" width=\"5\" height=\"5\" viewBox=\"0 0 321.883 321.883\"><path fill =\"#790FD0\" d=\"M160.941,0c-69.035,0-125,55.964-125,125.001c0,69.035,85.187,196.882,125,196.882c39.813,0,125-127.847,125-196.882C285.941,55.964,229.977,0,160.941,0z M160.941,182.294c-36.341,0-65.801-29.46-65.801-65.802c0-36.34,29.46-65.801,65.801-65.801c36.341,0,65.801,29.461,65.801,65.801C226.742,152.834,197.282,182.294,160.941,182.294z\"/></symbol><g id=\"mysvg2\" transform=\"matrix(1,0,0,-1,0,180)\"><line id=\"vertCenter\" x1=\"-105.09479752371388\" y1=\"40.575051059755694\" x2=\"-105.08185103116854\" y2=\"40.575604521207055\" stroke=\"black\" stroke-width=\".85\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-dasharray=\"1,3\" marker-end=\"url(#pointer)\"/><line id=\"vertCenter\" x1=\"-105.08185103116854\" y1=\"40.575604521207055\" x2=\"-105.08806706235754\" y2=\"40.57211220635228\" stroke=\"black\" stroke-width=\".85\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-dasharray=\"1,3\" marker-end=\"url(#pointer)\"/><line id=\"vertCenter\" x1=\"-105.08806706235754\" y1=\"40.57211220635228\" x2=\"-105.09479752371388\" y2=\"40.575051059755694\" stroke=\"black\" stroke-width=\".85\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-dasharray=\"1,3\" marker-end=\"url(#pointer)\"/></g>
    <g transform=\"matrix(1,0,0,-1,0,180) translate(1.5,5.25) rotate(180, -105.09479752371388, 40.575051059755694)\"><use href=\"#begin\" x=\"-105.09479752371388\"  y=\"40.575051059755694\" style=\"opacity:1.0\" /></g></svg></svg>`
        let result = acts.saveAsSVG(fileContents);
        expect(result).toEqual(svg)
    });
    it('saveAsKML correctly returns kml filetext', () => {
        let kml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>
    <kml xmlns=\"http://www.opengis.net/kml/2.2\" xmlns:gx=\"http://www.google.com/kml/ext/2.2\" xmlns:kml=\"http://www.opengis.net/kml/2.2\" xmlns:atom=\"http://www.w3.org/2005/Atom\">
      <Document>
        <name>MyTrip</name>
        <open>1</open>
        <Style id=\"CrossStyle\">
          <LineStyle><color>ffffffb6</color><width>4</width></LineStyle>
        </Style>
        <Placemark>
          <name>Cross-corner line</name>
          <styleUrl>#CrossStyle</styleUrl>
          <LineString>
          <coordinates> -105.09479752371388,40.575051059755694,0 -105.08185103116854,40.575604521207055,0 -105.08806706235754,40.57211220635228,0 -105.09479752371388,40.575051059755694,0 </coordinates>
    </LineString>
  </Placemark>
  </Document>
</kml>`
        let result = acts.saveAsKML(fileContents, 'MyTrip.kml');
        expect(result).toEqual(kml)
    });
});

import { sendAPIRequest } from '../restfulAPI';
import { getCurrentServerUrl } from '../../components/Margins/ServerSettings';
import { latLngToPlace, latLngToPlaceWithName, placeToLatLng, placeToLatLngWithName } from '../transformers';

export async function requestDistanceResults(places, unit){
    let distanceBody = getDistanceRequestBody(places, unit.value);
    let distances = await retrieveDistanceResults(distanceBody);
    updateTagsByIds(unit.unit, distances);
    return distances;
} 

function getDistanceRequestBody(places, earthRadius){
    return {
        requestType: "distances",
        earthRadius: parseFloat(earthRadius),
        places: getDistancePlaces(places, 1)
    };
}

export function getDistancePlaces(places, withNames){
        let formattedPlaces = [];
        for(let i = 0; i < places.length; i++)
            if (withNames == 1) {
                formattedPlaces.push(latLngToPlace(places[i]));
            } else if (withNames == 2) {
                formattedPlaces.push(latLngToPlaceWithName(places[i]));
            } else if (withNames == 3){
                formattedPlaces.push(placeToLatLng(places[i]));
            }
            else {
                formattedPlaces.push(placeToLatLngWithName(places[i]));
            }
        return formattedPlaces;
}

async function retrieveDistanceResults(distanceBody) { 
    const distanceRequest = await sendAPIRequest(distanceBody, getCurrentServerUrl());
    return (distanceRequest.distances.length == 0) ? ["0"] : distanceRequest.distances;   
}

export function updateTagsByIds(unitName, distances){
    let totalDistanceMsg = (distances.length > 1) ? sumOf(distances) + " " + unitName : "";
    document.getElementById("distanceMarker").innerHTML = totalDistanceMsg;
    for(let i = 0; i < distances.length; i++)
        updatePlacesTags(i, distances);
}

function sumOf(arr){
    let sum = 0;
    for(let i = 0; i < arr.length; i++)
        sum += arr[i];
    return sum;
}

function updatePlacesTags(index, distances){
    let message = "";
    if(distances.length < 2)
        message = "";
    else 
        message = (index == distances.length-1) ? (1+index)+"-"+"1: " : (1+index)+"-"+(2+index) + ": ";
    updatePlaceTag(message, distances, index);
}

function updatePlaceTag(message, distances, index){  
    try{
        var distanceRow = document.getElementById("loc" + index);
        const indexNode = document.createElement("font");
        const newMessage = document.createTextNode(message);
        indexNode.style.fontSize = "16px";
        indexNode.style.color = "#1E4D2B";
        indexNode.style.fontWeight = "650";
        indexNode.appendChild(newMessage);
        distanceRow.innerHTML = "";
        distanceRow.appendChild(indexNode);
        if(distances.length > 1)
            distanceRow.append(distances[index].toString());
    }catch(error){
        return;
    }
}

export function resetDistanceResults(){
    document.getElementById("distanceMarker").innerHTML = "";
}

import {validateLatitude, validateLongitude, invalidCoordniate} from './validators';
import { updateTagsByIds, requestDistanceResults } from './requests/distancesRequest';
let Coordinates = require('coordinate-parser');

export function inputCoordinates(){
    let inputtedLat = inputLatitude();
    if(inputtedLat != "")
        var inputtedLong = inputLongitude();
    let coords = new Coordinates(inputtedLat + ', ' + inputtedLong);
    return {latitude: coords.getLatitude().toString(), longitude: coords.getLongitude().toString()};
}

export function inputLatitude(){
    let lat = prompt("Enter Latitude:", "43.294601");
    while(lat != null && lat != "" && !validateLatitude(lat)){
        invalidCoordniate({type: "Latitude", value: lat});
        lat = prompt("Enter Latitude:", "43.294601");
    }
    return (lat != null) ? lat : "";
}

export function inputLongitude(){
    let long = prompt("Enter Longitude:", "-122.3453");
    while(long != null && long != "" && !validateLongitude(long)){
        invalidCoordniate({type: "Longitude", value: long});
        long = prompt("Enter Longitude:", "-122.3453");
    }
    return (long != null) ? long : "";
}

export function inputNewTripName(){
    let newTripName = prompt("Enter New Trip Name:");
    while (newTripName != null && !newTripName)
        newTripName = prompt("Value cannot be empty\nEnter New Trip Name");
    return (newTripName == null) ? false : newTripName;
}

export async function setNewUnit(props){
    let newUnit = buildNewUnit(); 
    if(!newUnit)
        return;
    await updateNewUnit(props, newUnit);
}

export function buildNewUnit(){
    let newUnitName = inputNewUnitName();
    if(!newUnitName)
        return false;
    let newUnitValue = inputNewUnitValue(newUnitName);
    return (!newUnitName && !newUnitValue) ? false : {"unit": newUnitName, "value": newUnitValue};
}

export function inputNewUnitName(){
    let newUnitName = prompt("Enter New Unit Name");
    while(newUnitName != null && newUnitName == ""){
        newUnitName = prompt("Enter New Unit Name");
    }
    return (newUnitName == null) ? false : newUnitName;
}

export function inputNewUnitValue(newUnitName){
    let newUnitValue = prompt("Enter " + newUnitName + " radius of earth");
    while(newUnitValue != null && (newUnitValue == "" || isNaN(newUnitValue)))
        newUnitValue = prompt("Enter " + newUnitName + " radius of earth");
    return (newUnitValue == null) ? "" : newUnitValue;
}

export function updateNewUnit(props, newUnit){
    newUnit.userCreated = true;
    props.placeActions.units.push(newUnit);
    localStorage.setItem("UNITS", JSON.stringify(props.placeActions.units));
    updateUnits(props, newUnit);
}

export async function updateUnits(props, newUnit){
    if(props.deleted[0]){
        props.deleted[0] = false;
        return;
    }
    localStorage.setItem("SELECTEDUNIT", JSON.stringify(newUnit));
    props.placeActions.selectedUnit = newUnit;
    await requestDistanceResults(props.places, newUnit);
}

export function deleteUnit(props, deleteUnit){
    props.deleted[0] = true;
    let copyList = props.placeActions.units.filter((unit, _) => unit.unit != deleteUnit.unit);
    localStorage.setItem("UNITS", JSON.stringify(copyList));
    props.placeActions.units = copyList;
}

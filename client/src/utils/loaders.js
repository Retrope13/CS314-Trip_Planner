import { EARTH_RADIUS_UNITS_DEFAULT } from '../utils/constants';

export function loadUserStoredUnits(){
    return (localStorage.getItem("UNITS") == null) ?  EARTH_RADIUS_UNITS_DEFAULT : appendUserUnits();
}

function appendUserUnits(){
    return JSON.parse(localStorage.getItem("UNITS"));
}

export function loadSelectedUnit(){
    return (localStorage.getItem("SELECTEDUNIT") == null) ? EARTH_RADIUS_UNITS_DEFAULT[0] : getSelectedUnit();
}

function getSelectedUnit(){
    return JSON.parse(localStorage.getItem("SELECTEDUNIT"));
}
import { useState } from 'react';
import { placeToLatLng } from '../utils/transformers';
import { reverseGeocode } from '../utils/reverseGeocode';
import { LOG } from '../utils/constants';
import { inputCoordinates } from '../utils/inputters';
import { DEFAULT_TRIP_NAME, DEFAULT_STARTING_PLACE } from '../utils/constants';
import { loadUserStoredUnits, loadSelectedUnit } from '../utils/loaders';


export function usePlaces() {
    const [places, setPlaces] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const context = { places, setPlaces, selectedIndex, setSelectedIndex };

    const placeActions = {
        tripName: DEFAULT_TRIP_NAME,
        units: loadUserStoredUnits(),
        selectedUnit: loadSelectedUnit(),
        changeTripName: (props) => changeTripName(props),
        append: async (place) => append(place, context),
        removeAtIndex: (index) => removeAtIndex(index, context),
        removeAll: () => removeAll(context),
        selectIndex: (index) => selectIndex(index, context),
        addInputtedLatLong: (props) => addInputtedLatLong(props)
    };

    return {places, selectedIndex, placeActions};
}

async function append(place, context) {
    const { places, setPlaces, setSelectedIndex } = context;

    const newPlaces = [...places];

    const fullPlace = await reverseGeocode(placeToLatLng(place));
    newPlaces.push(fullPlace);

    setPlaces(newPlaces);
    setSelectedIndex(newPlaces.length - 1);
}

export function retrieveGeolocation(props) {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            var currPlace = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            props.placeActions.append(currPlace);
        }, geolocationError(props))
    } else {
        geolocationError(props);
    }
}

function geolocationError(props) {
    props.placeActions.append(DEFAULT_STARTING_PLACE);
}

function removeAtIndex(index, context) {
    const { places, setPlaces, selectedIndex, setSelectedIndex } = context;
    if (index < 0 || index >= places.length) {
        LOG.error(`Attempted to remove index ${index} in places list of size ${places.length}.`);
        return;
    }
    const newPlaces = places.filter((place, i) => index !== i);
    setPlaces(newPlaces);

    if (newPlaces.length === 0) {
        setSelectedIndex(-1);
    } else if (selectedIndex >= index && selectedIndex !== 0) {
        setSelectedIndex(selectedIndex - 1);
    }
}

function removeAll(context) {
    const { setPlaces, setSelectedIndex } = context;

    try{
        document.getElementById("distanceMarker").innerHTML = "";
        document.getElementById("tripName").innerHTML = "My Trip ";
    }catch(e){}

    setPlaces([]);
    setSelectedIndex(-1);
}

function selectIndex(index, context) {
    const { places, setSelectedIndex } = context;

    if (index < -1 || index >= places.length) {
        LOG.error(`Attempted to select index ${index} in places list of size ${places.length}.`);
        setSelectedIndex(-1);
        return;
    }
    setSelectedIndex(index);
}

function addInputtedLatLong(props){
    let latLong = inputCoordinates();
    if(latLong.latitude != "" && latLong.longitude != "")
        props.placeActions.append(latLong, props);
}

export function changeTripName(props, name){
    if (name != ""){
        props.placeActions.tripName = name; 
        document.getElementById("tripName").innerHTML = props.placeActions.tripName + " ";
    }
}
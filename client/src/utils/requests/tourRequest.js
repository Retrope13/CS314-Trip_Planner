import { sendAPIRequest } from '../restfulAPI';
import { getCurrentServerUrl } from '../../components/Margins/ServerSettings';
import { getDistancePlaces } from './distancesRequest';
import { latLngToPlaceWithName, placeToLatLngWithName } from '../transformers';

export async function requestTourResults(places, unit, response){
    let tourBody = getTourRequestBody(places, unit.value, response);
    let tour = await retrieveTourResults(tourBody);
    return tour;
} 

function getTourRequestBody(places, earthRadius, response){
    return {
        requestType: "tour",
        response: parseInt(response),
        earthRadius: parseFloat(earthRadius),
        places: getDistancePlaces(places, 2)
    };
}

async function retrieveTourResults(tourBody) { 
    const tourRequest = await sendAPIRequest(tourBody, getCurrentServerUrl());
    return tourRequest.places;   
}

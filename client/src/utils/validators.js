let Coordinates = require('coordinate-parser');

export function validateLatitude(lat){
    if(!isValidPosition(lat + ', 0'))
        return false;
    lat = parseFloat(new Coordinates(lat + ', 0').getLatitude());
    return (lat >= -90.000 && lat <= 90.000) ? true : false;
}

export function validateLongitude(long){
    if(!isValidPosition("0, " + long))
        return false;
    long = parseFloat(new Coordinates("0, " + long).getLongitude());
    return (long >= -180.000 && long <= 180.000) ? true : false;
}

export function isValidPosition(pos){
    try{
        let coords = new Coordinates(pos);
        return true;
    }catch (error){
        return false;
    }
}

export function invalidCoordniate(props){
    alert("Invalid " + props.type + " Coordinates\nValue Given: " + props.value);
}

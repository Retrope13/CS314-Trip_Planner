import React from 'react';
import { LayersControl, Map as LeafletMap, Polyline, TileLayer } from 'react-leaflet';
import Marker from './Marker';
import { latLngToPlace, placeToLatLng } from '../../../utils/transformers';
import { DEFAULT_STARTING_PLACE } from '../../../utils/constants';
import 'leaflet/dist/leaflet.css';

const MAP_BOUNDS = [[-90, -180], [90, 180]];
const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 19;
var LineColor = "000";
var LineWeight = 5;
var LineStyle = false;

export default function Map(props) {
    function handleMapClick(mapClickInfo) {
        props.placeActions.append(latLngToPlace(mapClickInfo.latlng));
        if (localStorage.getItem("prevMap") == null) {
            localStorage.setItem("prevMap", 2);
        }
    }
    return (
        <LeafletMap
            className="mapStyle"
            boxZoom={false}
            useFlyTo={true}
            zoom={15}
            minZoom={MAP_MIN_ZOOM}
            maxZoom={MAP_MAX_ZOOM}
            maxBounds={MAP_BOUNDS}
            center={placeToLatLng(DEFAULT_STARTING_PLACE)}
            onClick={handleMapClick}
            data-testid="Map"
            onbaselayerchange={(e)=> storeMap(e)}
        >
            <TripLines places={props.places} />
            <PlaceMarker places={props.places} selectedIndex={props.selectedIndex} />
            <MapControl/>
        </LeafletMap>
    );
}
function storeMap(e) {
    if (e.name == "Stadia") {
        localStorage.setItem("prevMap", 0);
    } else if (e.name == "Esri.NatGeo") {
        localStorage.setItem("prevMap", 1);
    } else {
        localStorage.setItem("prevMap", 2);
    }
}

function MapControl() {
    let checkedBaseLayers = getCheck();
    return (
        <LayersControl position="topright">
                <LayersControl.BaseLayer checked={checkedBaseLayers[0]} name="Stadia">
                    <TileLayer  attribution= "&copy; <a href=&quot;thttps://stadiamaps.com/&quot;>Stadia Maps</a> contributors" url= "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"/>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked={checkedBaseLayers[1]} name="Esri.NatGeo">
                    <TileLayer  attribution= 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'url= "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"/>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked={checkedBaseLayers[2]} name="OpenStreet">
                    <TileLayer attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" url= "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                </LayersControl.BaseLayer>
            </LayersControl>
    );
}

function getCheck() {
    let selectedIndex = localStorage.getItem("prevMap");
    if (selectedIndex == 0) {
        return [true, false, false];
    } else if (selectedIndex == 1){
        return [false, true, false];
    } else {
        return [false, false, true];
    }
}

function TripLines(props) {
    const pathData = computePaths(props.places);
    return pathData.map((path, index) =>
        <Polyline
            dashArray={LineStyle}
            weight={LineWeight}
            color={'#' + LineColor}
            key={`${JSON.stringify(path)}-${index}`}
            positions={path}
        />
    );
}

export function LineStyleChange(style){
    if(style == true){
        LineStyle = 10;
    }else{
        LineStyle = 0;
    }
}

export function LineColorChange(color){
    if (color != null){
        if(color.length == 3){
            if(ValidRGB(color)){
                LineColor = color;
            }
        }
    }
}

function ValidRGB(color){
    const nums = ["1","2","3","4","5","6","7","8","9","0","A","B","C","D","E","F","a","b","c","d","e","f"]
    for (let i = 0; i < color.length; i++){
        if (!nums.includes(color[i])){
            console.log("False");
            return false;
        }
    }
    return true;
}

export function LineWeightChange(weight){
    if(ValidWeight(weight)){
        LineWeight = weight;
    }
}

function ValidWeight(weight){
    if(weight >= 1 && weight <= 50){
        return true;
    }
    return false;
}

function computePaths(places) {
    if (places.length < 2) {
        return [];
    }

    const pathPointPairs = [];
    for (let i = 0; i < places.length; i++) {
        const fromPlace = places[i];
        const toPlace = places[(i+1) % places.length];
        pathPointPairs.push([fromPlace, toPlace]);
    }
    return pathPointPairs;
}

function PlaceMarker({places, selectedIndex}) {
    if (selectedIndex === -1) {
        return null;
    }
    return <Marker place={places[selectedIndex]} />;
}
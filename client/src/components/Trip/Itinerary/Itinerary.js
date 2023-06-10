import React from 'react';
import { Table } from 'reactstrap';
import { ItineraryActionsDropdown, PlaceActionsDropdown, GetUnitsDropdown } from './actions.js';
import { FilePopup } from './popups.js';
import { TripNameModal } from './tripnameModal.js';
import { latLngToText } from '../../../utils/transformers';
import { FaExchangeAlt, FaUndo, FaRoute} from 'react-icons/fa';
import { useState } from 'react';
import { loadSelectedUnit } from '../../../utils/loaders.js';
import { reverseTrip, changePlacesIndex } from './tripModifiers.js';
import { SortableContainer, SortableElement} from "react-sortable-hoc";
import { requestTourResults } from '../../../utils/requests/tourRequest';
import { placeToLatLngWithName } from '../../../utils/transformers';
import { SettingsModal } from './settingsModal.js';

export default function Itinerary(props) {
    return (
        <Table responsive striped>
            <Header placeActions={props.placeActions} places={props.places}/>
            <Body places={props.places} placeActions={props.placeActions}/>
        </Table>
    );
}

function Header(props) {
    const [buttonCancel, setButtonCancel] = useState(true);
    return (
        <thead>
            <tr>
                <th><a title="Reverse trip"><FaExchangeAlt transform='rotate(90)' color="#1E4D2B" onClick={() => reverseTrip(props.places, props.placeActions)}/></a></th>
                <th>
                    <a title="Change trip name"><TripNameModal {...props}/></a>
                    
                </th>
                <th id="distanceMarker"></th>
                <th>
                    <a className="hover" title = "Change units"><GetUnitsDropdown {...props}/></a>
                </th>
                <th>
                    <a className="hover" title ="Save/load trip"><FilePopup {...props}/></a>
                </th>
                <th>
                    <a className="hover" title="Settings"><SettingsModal {...props}/></a>
                </th>
                <th>
                    <a className="hover" title="Shorten trip"><FaRoute color="#1E4D2B" onClick={() => { shortenTrip(props); setButtonCancel(false); }}/></a>
                </th>
                <th>
                    <a className="hover" title="Revert trip">{!buttonCancel && <FaUndo color="#1E4D2B" onClick={() => { revertShortened(props); setButtonCancel(true)}}/>}</a>
                </th>
                <th>
                    <a className = "hover"><ItineraryActionsDropdown placeActions={props.placeActions} places={props.places}/></a>
                </th>
            </tr>
        </thead>
    );
}

async function shortenTrip(props) {
    let newTrip = [];
    let previousTrip = [];
    for (let i=0; i < props.places.length; i++) {
        previousTrip[i] = props.places[i];
    }

    localStorage.setItem("PrevTrip", JSON.stringify(previousTrip));
    if (previousTrip.length > 0) {
        newTrip = await requestTourResults(props.places, loadSelectedUnit(), 1000);
        props.places.length = 0;
        for (let i = 0; i < newTrip.length; i++) {
            props.places.push(placeToLatLngWithName(newTrip[i]));
        }
        await props.placeActions.selectIndex(props.places.length-1)
        await props.placeActions.selectIndex(0)
    }
}

async function revertShortened(props) {
    let prevTrip = JSON.parse(localStorage.getItem("PrevTrip"));
    if (prevTrip.length > 0) {
        props.places.length = 0;
        for (let k=0; k < prevTrip.length; k++) {
            props.places.push(prevTrip[k]);
        } 
        await props.placeActions.selectIndex(props.places.length-1)
        await props.placeActions.selectIndex(0)
    }
}

function Body(props) {
    return (
        <SortableList {...props} 
        updateBeforeSortStart={(node) => document.getElementById("loc"+node.index).innerHTML=null}
        onSortEnd = {(newIndex, oldIndex) => changePlacesIndex(props.places, props.placeActions, newIndex, oldIndex)}
        useWindowAsScrollContainer = {true}
        pressDelay = {275}
        />
    );
}

function TableRow(props) {
    let name = props.place.name ? props.place.name : "-";
    name = Number.isInteger(Number(name.split(",")[0])) ? name.split(",")[0]+name.split(",")[1] : name.split(",")[0]
    const location = latLngToText(props.place);
    const id = "loc" + props.index;
    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
                <td onClick={() => props.placeActions.selectIndex(props.index)} >
                    <a className = "hover">{name}</a>
                    <br/>
                </td>
            <td id={id}></td>
            <td onClick={() => props.placeActions.selectIndex(props.index)} />
            <td />
            <td />
            <td />
            <td />
            <td>
                <a className = "hover">
                    <PlaceActionsDropdown places={props.places} placeActions={props.placeActions} index={props.index} />
                </a>
            </td>
        </tr>
    );
}

const SortableItem = SortableElement((props) => {
    return(
        <TableRow 
            key={`table-${JSON.stringify(props.place)}-${props.i}`}
            places={props.places}
            place={props.place}
            placeActions={props.placeActions}
            index={props.i}
        />
    );
});
const SortableList = SortableContainer((props) => {
    
    return (
        <tbody>
            {props.places.map((place, index) =>
                <SortableItem
                  key={`table-${JSON.stringify(place)}-${index}`}
                  places={props.places}
                  place={place}
                  placeActions={props.placeActions}
                  index = {index}
                  i={index}
                />
            )}
        </tbody>
    );
});
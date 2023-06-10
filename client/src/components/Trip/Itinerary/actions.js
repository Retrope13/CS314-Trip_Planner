import React from 'react';
import { Button, ButtonGroup, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaHome, FaTrash, FaTrashAlt, FaSearchLocation, FaMapMarkerAlt, FaRuler } from 'react-icons/fa';
import { retrieveGeolocation } from '../../../hooks/usePlaces';
import { setNewUnit, updateUnits, deleteUnit } from '../../../utils/inputters';
import { saveItinerary } from './fileSaveLoad';
import { newStartingPlace } from './tripModifiers';
import { loadSelectedUnit } from '../../../utils/loaders';

export function ItineraryActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem onClick={() => retrieveGeolocation(props)} data-testid='home-button'>
                <FaHome color="#1E4D2B" title="Add current location"/>
            </DropdownItem>
            <DropdownItem onClick={() => props.placeActions.addInputtedLatLong(props)} >
                <FaSearchLocation color="#1E4D2B" title="Lat/lng search" />
            </DropdownItem>
            <DropdownItem onClick={() => props.placeActions.removeAll()} data-testid='delete-all-button'>
                <FaTrashAlt color="#1E4D2B" title="Remove all" />
            </DropdownItem>
        </ActionsDropdown>
    );
}

export function PlaceActionsDropdown(props) {
    return (
        <ActionsDropdown {...props}>
            <DropdownItem title="Start trip from here" onClick={() => newStartingPlace(props.places, props.index, props.placeActions)} data-testid={`new-start-${props.index}`}>
                <FaMapMarkerAlt color="#1E4D2B" />
            </DropdownItem>
            <DropdownItem title="Delete" onClick={() => props.placeActions.removeAtIndex(props.index)} data-testid={`delete-button-${props.index}`}>
                <FaTrash color="#1E4D2B" />
            </DropdownItem>
        </ActionsDropdown>
    );
}

function ActionsDropdown(props) {
    return (
        <UncontrolledDropdown direction="left">
            <DropdownToggle tag="div" data-testid={`row-toggle-${props.index}`}>
                <BiDotsVerticalRounded size="1.5em" />
            </DropdownToggle>
            <DropdownMenu>
                <ButtonGroup>
                    {props.children}
                </ButtonGroup>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
}

export function GetUnitsDropdown(props){
    return(
        <UnitsDropdown placeActions={props.placeActions} places={props.places} deleted={ [false] }/>
    );
}

function UnitsDropdown(props){
    return(
        <UncontrolledDropdown direction="down">
        <DropdownToggle tag='div'>
            <FaRuler />
        </DropdownToggle>
        <DropdownMenu modifiers={{
            setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                    return { ...data, styles: { ...data.styles, overflow: 'auto', maxHeight: '80px', }, };
                },
            },
        }}>
            <GetUnitOptions {...props}/>
            <DropdownItem divider/>
            <DropdownItem onClick={() => setNewUnit(props)}>New Unit+</DropdownItem>
        </DropdownMenu>
        </UncontrolledDropdown>
    );
}
export function GetSaveOptions(props){
    let fileTypes = [{"name": "json", "type": 'application/json'},{"name": "csv", "type": 'text/csv'},{"name": "svg", "type": 'image/svg+xml'}, {"name": "kml", "type": 'application/vnd.google-earth.kml+xml'}]
    return fileTypes.map((r, i) =>
        <Button key={i} onClick={() => saveItinerary(JSON.stringify(props.places), props.placeActions.tripName + '.' + r.name , r.type)}>{r.name.toUpperCase()}</Button> 
    );
}

function GetUnitOptions(props){
    let selectableUnits = props.placeActions.units.filter((u,i) => loadSelectedUnit().unit != u.unit);
    return selectableUnits.map((r, i) =>
        <DropdownItem 
          key={i} 
          onClick={() => updateUnits(props, selectableUnits[i])}
            >{r.unit}{isUserUnit(r) && <FaTrash onClick={() => deleteUnit(props, r)}/>} 
        </DropdownItem> 
    );
}
function isUserUnit(unit){
    return (unit.userCreated && unit.unit != loadSelectedUnit().unit);
}

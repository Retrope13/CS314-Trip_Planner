import React, {useState} from 'react';
import { Button, Input, Modal, ModalBody, ModalHeader, ModalFooter, Container, ButtonGroup } from 'reactstrap';
import { SettingsRow } from '../../Margins/ServerSettings.js';
import { LineColorChange, LineWeightChange, LineStyleChange } from '../Map/Map.js';
import { FaWrench } from 'react-icons/fa';
import { placeToLatLngWithName, latLngToPlaceWithName } from '../../../utils/transformers.js';

export function SettingsModal(props) {
    let backup = localStorage.setItem("tripBackup",props.places);
    const [buttonModal, setButtonModal] = useState(false);
    let data;
    let color;
    let weight;
    let style;
    return (
        <div >
            <FaWrench color= "#1E4D2B" onClick={() => setButtonModal(true)}/>
            <Modal
                centered
                isOpen={buttonModal}>
                <ModalHeader className="ml-2">
                    Settings
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <p><strong>Line:</strong></p>
                        <SettingsRow label="Color (Hex):" value={
                            <Input type="text" onChange={(e) => color = e.target.value} placeholder="3 Characters"/>
                        }/>
                        <SettingsRow label="Thickness:" value={
                            <Input type="text" onChange={(e) => weight = e.target.value} placeholder="Between 1-50"/>
                        }/>
                        <SettingsRow label="Style:" value={
                            <ButtonGroup>
                                <Button onClick={(e) => style = true}>Dashed Line</Button>
                                <Button onClick={(e) => style = false}>Solid Line</Button>
                            </ButtonGroup>
                        }/>
                        <p><strong>Filter:</strong></p>
                        <SettingsRow label="MyTrip:" value={
                            <Input type = "filter" placeholder="Filter the Selected List" onChange = {(e) => data = e.target.value}/>
                        }/>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {LineColorChange(color); searchInput(backup, data, props ); LineStyleChange(style); LineWeightChange(weight); setButtonModal(false)}}>Save</Button>
                    <Button color="secondary" onClick={() => setButtonModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
async function searchInput (backup, data, props){
    let filterList = [];
    let size  = props.places.length;
    if (data == null){
        return backup;
    }else{    
        if (size != 0){
            for (let i =0; i < size; ++i){
                if (props.places[i].name != null){
                    let currPlace = props.places[i].name.toLowerCase();
                    if (currPlace.includes(data.toLowerCase())){
                        filterList.push(latLngToPlaceWithName(props.places[i]));
                    }
                }    
            } 
            props.places.length = 0;
            for (let j = 0; j< filterList.length; ++j){
                 props.places.push(placeToLatLngWithName(filterList[j]));
            }
            await props.placeActions.selectIndex(props.places.length-1)
            await props.placeActions.selectIndex(0)
            return props.places;
        }
    }
}
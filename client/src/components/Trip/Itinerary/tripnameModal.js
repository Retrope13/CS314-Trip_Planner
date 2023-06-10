import React from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Container, Input } from 'reactstrap';
import { FaPencilAlt } from 'react-icons/fa';
import { useState } from 'react';
import { changeTripName } from '../../../hooks/usePlaces.js';
import { SettingsRow } from '../../Margins/ServerSettings.js';

export function TripNameModal(props) {
    const [buttonModal, setButtonModal] = useState(false);
    let name = "";
    return (
        <div >
            <FaPencilAlt color= "#1E4D2B" size = {12} onClick={() => setButtonModal(true)}/>
            <span id="tripName"> {props.placeActions.tripName + " "} </span>
            <Modal
                centered
                isOpen={buttonModal}>
                <ModalHeader className="ml-2">
                    Change Trip Name
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <SettingsRow placeholder="Enter trip name" label="Trip Name:" value={<Input type="text" onChange={(e) => name = e.target.value} onClick={(e) => e.target.value = ""}/>} />
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {changeTripName(props, name); setButtonModal(false)}}>Save</Button>
                    <Button color="secondary" onClick={() => setButtonModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
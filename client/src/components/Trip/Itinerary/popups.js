import React from 'react';
import { Button, ButtonGroup, Modal, ModalBody, ModalHeader, ModalFooter, Container, Input, Row, Col } from 'reactstrap';
import { GetSaveOptions } from './actions.js';
import { FaSave } from 'react-icons/fa';
import { useState } from 'react';
import { parseFile } from './fileSaveLoad.js';
import { SettingsRow } from '../../Margins/ServerSettings.js';


export function FilePopup(props) {
    const [buttonModal, setButtonModal] = useState(false);
    return (
        <div >
            <FaSave color = "#1E4D2B" onClick={() => setButtonModal(true)}/>
            <Modal
                centered
                isOpen={buttonModal}>
                <ModalHeader className="ml-2">
                    Save and Load Files
                </ModalHeader>
                <ModalBody>
                    <Container>
                        <SettingsRow label="Load File:" value={<Input type="file" name="file" accept = '.json, .csv' onChange={(e) => parseFile(e.target.files[0], props.places,props.placeActions)} onClick={(e) => e.target.value = ""}/>} />
                        <SettingsRow label=" " value={" "} />
                        <SettingsRow label="Save File:" value={<ButtonGroup><GetSaveOptions {...props}/></ButtonGroup>} />
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setButtonModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
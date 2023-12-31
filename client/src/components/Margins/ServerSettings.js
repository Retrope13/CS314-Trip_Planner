import React, { useState } from 'react';
import { Button, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { useServerInputValidation } from '../../hooks/useServerInputValidation';
import { getOriginalServerUrl, sendAPIRequest } from '../../utils/restfulAPI';

export default function ServerSettings(props) {
    const [serverInput, setServerInput, config, validServer, resetModal]
        = useServerInputValidation(props.serverSettings.serverUrl, props.toggleOpen);

    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleOpen}>
            <Header toggleOpen={props.toggleOpen} />
            <Body
                serverInput={serverInput}
                setServerInput={setServerInput}
                serverSettings={props.serverSettings}
                serverName={getCurrentServerName(config, props.serverSettings)}
                validServer={validServer}
            />
            <Footer
                config={config}
                serverInput={serverInput}
                validServer={validServer}
                resetModal={resetModal}
                processServerConfigSuccess={props.processServerConfigSuccess}
            />
        </Modal>
    );
}

function getCurrentServerName(config, serverSettings) {
    if (config) {
        return config.serverName;
    }
    else if (serverSettings.serverConfig) {
        return serverSettings.serverConfig.serverName;
    }
    return "";
}

function Header(props) {
    return (
        <ModalHeader className="ml-2" toggle={props.toggleOpen}>
            Server Connection
        </ModalHeader>
    );
}

function Body(props) {
    const [featureArray, setFeatureArray] = useState(["config", "find", "distances", "tour", "type", "where"])
    const urlInput =
        <Input
            value={props.serverInput}
            placeholder={props.serverSettings.serverUrl}
            onChange={(e) => { props.setServerInput(e.target.value) 
            verifyAPI(setFeatureArray, e.target.value)
            }}
            valid={props.validServer}
            invalid={!props.validServer}
        />;

    return (
        <ModalBody>
            <Container>
                <SettingsRow label="Name:" value={props.serverName} />
                <SettingsRow label="URL:" value={urlInput} />
                <SettingsRow label="Features:" value={featureArray.join(", ")} />
            </Container>
        </ModalBody>
    );
}

export function SettingsRow({label, value}) {
    return (
        <Row className="my-2 vertical-center">
            <Col xs={3}>
                {label}
            </Col>
            <Col xs={9}>
                {value}
            </Col>
        </Row>
    );
}

function Footer(props) {
    return (
        <ModalFooter>
            <Button color="secondary" onClick={props.resetModal}>Cancel</Button>
            <Button color="primary" onClick={() => {
                props.processServerConfigSuccess(props.config, props.serverInput);
                props.resetModal(props.serverInput);
                setCurrentServerUrl(props.serverInput);
            }}
                disabled={!props.validServer}
            >
                Save
            </Button>
        </ModalFooter>
    );
}

async function verifyAPI(setFeatureArray, input){
        const configResponse = await sendAPIRequest({ requestType: "config" }, input);
        if (configResponse){setFeatureArray(configResponse.features)}
}

var serverUrl = getOriginalServerUrl();

function setCurrentServerUrl(url){
    serverUrl = url;
}

export function getCurrentServerUrl(){
    return serverUrl;
}


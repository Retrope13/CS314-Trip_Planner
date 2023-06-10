import React , { useState} from 'react';
import { Col, Container, Row , Button, Input, ListGroup, InputGroup, InputGroupAddon, ListGroupItem } from 'reactstrap';
import Map from './Map/Map';
import Itinerary from './Itinerary/Itinerary';
import { usePlaces } from '../../hooks/usePlaces';
import { sendAPIRequest } from '../../utils/restfulAPI'
import { FaRandom ,FaTimes } from 'react-icons/fa';
import { requestDistanceResults } from '../../utils/requests/distancesRequest';
import { loadSelectedUnit } from '../../utils/loaders';
import { FilterModal } from './filterModal.js';

export default function Planner(props) {
    const {places, selectedIndex, placeActions} = usePlaces();
    const [resultArray, setResultArray] = useState([]);
    const [value, setValue] = useState("");
    const [type, setType] = useState([]);
    const [where, setWhere] = useState([]);
    if(places.length > 0)
        requestDistanceResults(places, loadSelectedUnit());
    return (
        <Container>
            <Section>
                <Map places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
            <Section>
                <InputBar where = {where} setWhere = {setWhere} type = {type} setType = {setType} resultArray = {resultArray} value ={value} setValue= {setValue} setResultArray = {setResultArray} serverSettings = {props.serverSettings}/>
                <ListGroup data-testid="result-list">                      
                    <Result places = {places} results = {resultArray} placeActions = {placeActions} setValue={setValue}/>                        
                </ListGroup>                      
            </Section>   
            <Section>
                <Itinerary places={places} selectedIndex={selectedIndex} placeActions={placeActions} />
            </Section>
        </Container>
    );
}

function Section(props) {
    return (
        <Row>
            <Col sm={12} md={{ size: 10, offset: 1 }}>
                {props.children}
            </Col>
        </Row>
    );
}

export function InputBar(props){
    const [buttonModal, setButtonModal] = useState(false);
    return(
        <InputGroup>
            <InputGroupAddon addonType = "prepend" color = "primary">
            <Button onClick = {() => setButtonModal(true)} size = "sm" color = "primary">
                <a className = "hover" title = "Filter search">
                    <FilterModal buttonModal = {buttonModal} setButtonModal = {setButtonModal}{...props} />
                </a>
            </Button>
            </InputGroupAddon>
            <Input 
                type= "text"
                placeholder = "Search location by name..."
                value = {props.value}
                onChange = { (e) => {props.setValue(e.target.value); requestSearchResults({input:e.target.value, type: props.type, where:props.where}, props.resultArray, props.setResultArray, props.serverSettings.serverUrl)}}
            />
            <InputGroupAddon addonType = "append">
                <Button data-testid="random-button" title = "Random places" color = "primary" onClick = {() => {randomRequest({type: props.type, where:props.where}, props.resultArray, props.setResultArray, props.serverSettings.serverUrl)}}>
                    <FaRandom/>
                </Button>
                <Button size = "sm" title = "Clear"  color = "primary"onClick = {()=>{props.setValue(""); props.setResultArray([])}}><FaTimes /></Button>
            </InputGroupAddon> 
        </InputGroup>
    );
}

export async function randomRequest(input, resultArray, setResultArray, serverUrl){
    let limit = 5;
    let body = {
        "requestType": "find",
        "match": "",
        "limit": limit,
        "type": input.type,
        "where": input.where
    }
    const toSetArray = []
    await retrieveSearchResults(body, toSetArray, setResultArray, serverUrl);
    await setResultArray(toSetArray);
    return(resultArray);
} 

export async function requestSearchResults(input, resultArray, setResultArray, serverUrl){
    if (input.input == ""){
        await new Promise(r => setTimeout(r, 500));
        await setResultArray([]);
        return resultArray
    }else{
    let limit = 5;
    let body = {
        "requestType": "find",
        "match": input.input,
        "limit": limit,
        "type": input.type,
        "where": input.where
    }
    const toSetArray = []
    await retrieveSearchResults(body, toSetArray, setResultArray, serverUrl);
    await setResultArray(toSetArray);
    return(resultArray);
    }
} 

export async function retrieveSearchResults(body, requestArray, setResultArray, serverUrl) { 
    let limit = 5;
    const findRequest = await sendAPIRequest(body, serverUrl);
    const found = findRequest.found;
    
    if (found < limit) {
        limit = found;
    }
    for (let i = 0; i < limit; i++) {
        requestArray.push(findRequest.places[i]);
    }

    await setResultArray(requestArray)
}

const Result = (props) => {
    function handleClick(place){
        props.placeActions.append(place);
        props.setValue("");
    }
    return props.results.map((r, i) =>
        <a key = {i} className = "hover">
        <ListGroupItem 
            onClick = { () =>
               handleClick(props.results[i])
            } > {r.name} 
        </ListGroupItem></a>);
}

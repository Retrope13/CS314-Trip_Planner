import React from 'react';
import { Button, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, ModalFooter, Input, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

export function FilterModal(props){
    const [typeToSave, setTypeToSave] = useState([]); const [whereToSave, setWhereToSave] = useState([])
    return(
        <div >
            <FaFilter color = "white"/>
            <Modal centered isOpen = {props.buttonModal}>
                <ModalHeader>Filter Search</ModalHeader>
                <ModalBody>
                    <Row className="my-2 vertical-center"><Col>
                    Chosen: [{arrayUnique(typeToSave.concat(props.type)).filter(Boolean).join(", ")}]<a onClick = { () => {props.setType([]); setTypeToSave([]);}}>x </a> [{arrayUnique(whereToSave.concat(props.where)).join(", ")}] <a onClick = { () => {props.setWhere([]); setWhereToSave([]);}}>x </a>
                    </Col></Row>
                    <Row className="my-2 vertical-center"> <Col >
                        <Form> <TypeCheckbox typeToSave = {typeToSave} setTypeToSave = {setTypeToSave}/> </Form>
                    </Col></Row>
                    <Row className="my-2 vertical-center"><Col>
                        <CountryBar whereToSave = {whereToSave} setWhereToSave = {setWhereToSave} typeToSave = {typeToSave} setTypeToSave = {setTypeToSave}/>
                    </Col></Row>
                </ModalBody>
                <ModalFooter>
                    <Button color = "primary" onClick={()=> {props.setType(typeToSave.slice(0));props.setWhere(whereToSave.slice(0)); props.setButtonModal(false);}}>Save</Button>
                    <Button color = "primary" onClick={()=> {props.setButtonModal(false); setTypeToSave([]); setWhereToSave([]);}}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
export function TypeCheckbox(props){
    const typearr = ["Airport", "Heliport", "Balloonport", "Other"]
    return typearr.map((r, i) => (
        <FormGroup check inline key={i} >
                <Label check>
                    {r}
                </Label>
            &nbsp; <Input type="checkbox" id = {typearr[i]} onChange = {() => {checkTypes(props)}}/>
        </FormGroup>
        )
    );
}

export async function checkTypes(props){
    let checkArray = [document.getElementById("Airport"),document.getElementById("Heliport"), document.getElementById("Balloonport"), document.getElementById("Other")]
    for (let i = 0;i < checkArray.length;i++){
        props.typeToSave[i] = (checkArray[i].checked) ? true:false
    }

    booleanArrayToType(checkArray, props.typeToSave)
    const filtered = await props.typeToSave.filter(Boolean)
    await props.setTypeToSave(filtered)
}

function booleanArrayToType(checkArray, typeToSave){
    for (let i = 0; i< checkArray.length; i++){
        typeToSave[i] = (typeToSave[i]) ? checkArray[i].id.toLowerCase():typeToSave[i]
    }
}


function CountryBar(props){
    const countries = ['Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla','Antarctica','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','British Indian Ocean Territory','British Virgin Islands','Brunei','Bulgaria','Burkina Faso','Burma','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Caribbean Netherlands','Cayman Islands','Central African Republic','Chad','Chile','China','Christmas Island','Cocos (Keeling) Islands','Colombia','Comoros','Congo (Brazzaville)','Congo (Kinshasa)','Cook Islands','Costa Rica','Côte d\'Ivoire','Croatia','Cuba','Curaçao','Cyprus','Czechia','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Guiana','French Polynesia','French Southern Territories','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guadeloupe','Guam','Guatemala','Guernsey','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kiribati','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macau','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Martinique','Mauritania','Mauritius','Mayotte','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Namibia','Nauru','Nepal','Netherlands','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Niue','Norfolk Island','North Korea','Northern Mariana Islands','Norway','Oman','Pakistan','Palau','Palestinian Territory','Panama','Papua New Guinea','Paraguay','Perú','Philippines','Poland','Portugal','Puerto Rico','Qatar','Réunion','Romania','Russia','Rwanda','Saint Barthélemy','Saint Helena','Saint Kitts and Nevis','Saint Lucia','Saint Martin','Saint Pierre and Miquelon','Saint Vincent and the Grenadines','Samoa','San Marino','São Tomé and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Sint Maarten','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Turks and Caicos Islands','Tuvalu','U.S. Virgin Islands','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States Minor Outlying Islands','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Wallis and Futuna','Western Sahara','Yemen','Zambia','Zimbabwe']
    const [filtered, setFiltered] = useState([]);
    
    const handleInput = (arr, searchInput) => {
      if (searchInput == "") return []
      const filteredData = arr.filter(value => {
        const searchStr = searchInput.toString().toLowerCase();
        const nameMatches = value.toLowerCase().includes(searchStr);
        return nameMatches;
      });
      return filteredData
    }
    return (
      <div>
      <Input type= "text"
      placeholder = "Filter search by country"
      onChange = { (e) => { setFiltered(handleInput(countries, e.target.value))}}>
      </Input>
      <ListGroup style = {{"overflow-y":"auto", "max-height":"150px"}}>
      <Filtered {...props} results = {filtered}></Filtered>
      </ListGroup>
      </div>
    );
  }

const Filtered = (props) => {
    function handleClick(place, arr){
        let newWhere = props.whereToSave
        if (!props.whereToSave.includes(place)){
            newWhere.push(place)
            props.setWhereToSave(newWhere)
            checkTypes(props)
        }
    }
    return props.results.map((r, i) =>
        <a className = "hover">
        <ListGroupItem 
            onClick = { () =>
               handleClick(props.results[i], props.results)
            }
            key = {i} > {r} 
        </ListGroupItem></a>);
  }
  
  function arrayUnique(array) {
    let uniqueArray = array.filter(function(item, pos, self) {
        return self.indexOf(item) == pos;
    })
    return uniqueArray;
}
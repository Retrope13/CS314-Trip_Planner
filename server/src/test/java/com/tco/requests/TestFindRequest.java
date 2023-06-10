package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestFindRequest {
    private FindRequest find;
    private FindRequest rand;
    @BeforeEach
    public void createFindForTestCases() {
        find = new FindRequest();
        find.setMatch("testing");
        find.setLimit(3);
        String[] types = {"heliport"};
        find.setType(types);
        find.buildResponse();


        rand = new FindRequest();
        rand.setMatch("");
        rand.setLimit(10);
        rand.buildResponse();
    }

    public FindRequest buildFindRequest(String match, boolean types, boolean where){
        String[] typeList = {"heliport", "airport"};
        String[] whereList = {"Afghanistan", "Côte d\'Ivoire"};
        FindRequest findRequest = new FindRequest();
        findRequest.setMatch(match);
        findRequest.setLimit(3);
        if(types)
            findRequest.setType(typeList);
        if(where)
            findRequest.setWhere(whereList);
        findRequest.buildResponse();
        return findRequest;
    }

    public Places getTestPlaces(){
        Places places = new Places();
        Place place = new Place();
        place.put("latitude", "40.341800689697266");
        place.put("longitude", "-74.71630096435547");
        place.put("name", "Educational Testing Heliport");
        places.add(place);
        return places;
    }

    @Test
    @DisplayName("Set and get match in find request")
    public void testMatch() {
        find.setMatch("Houston");
        assertEquals("Houston", find.getMatch());
        find.setMatch("");
        assertEquals("", find.getMatch());
    }

    @Test
    @DisplayName("Set and get limit in find request")
    public void testLimit() {
        find.setLimit(10);
        assertEquals(10, find.getLimit());
        find.setLimit(0);
        assertEquals(0, find.getLimit());
    }

    @Test
    @DisplayName("Get correct places and found from match in find request")
    public void testPlaces(){
        Places testPlaces = getTestPlaces();
        assertEquals(testPlaces, find.getPlaces());
        assertEquals(1, find.getFound());
    }

    @Test
    @DisplayName("Get places and found from random in find request")
    public void testRandom(){
        assertEquals(50427, rand.getFound());
        assertEquals(10, rand.getPlaces().size());
    }

    @Test
    @DisplayName("Test Where List")
    public void testWhere(){
        FindRequest whereRequest = buildFindRequest("a", false, true);
        assertEquals(87, whereRequest.getFound());
    }

    @Test
    @DisplayName("Test Where and Type List")
    public void testWhereAndType(){
        FindRequest whereRequest = buildFindRequest("a", true, true);
        assertEquals(87, whereRequest.getFound());
    }

    @Test
    @DisplayName("Test Random Where List")
    public void testRandWhere(){
        FindRequest randWhereRequest = buildFindRequest("", false, true);
        assertEquals(87, randWhereRequest.getFound());
    }

    @Test
    @DisplayName("Test Random Type List")
    public void testRandType(){
        FindRequest randTypeRequest = buildFindRequest("", true, false);
        assertEquals(47360, randTypeRequest.getFound());
    }

    @Test
    @DisplayName("Test Random Where and Type List")
    public void testRandWhereAndType(){
        FindRequest randWTRequest = buildFindRequest("", true, true);
        assertEquals(87, randWTRequest.getFound());
    }
}
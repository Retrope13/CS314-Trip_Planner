package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestDistancesRequest {

    private DistancesRequest dist;

    @BeforeEach
    public void createDistancesForTestCases() {
        dist = new DistancesRequest();
        dist.setEarthRadius(420.69);
        dist.setPlaces(getTestPlaces());
        dist.buildResponse();
    }

    public Places getTestPlaces(){
        Places places = new Places();
        Place place = new Place();
        place.put("latitude", "0.0");
        place.put("longitude", "0.0");
        places.add(place);
        places.add(place);
        places.add(place);
        return places;
    }

    @Test
    @DisplayName("Set earthRadius and get earthRadius in Distance request")
    public void testEarthRadius() {
        dist.setEarthRadius(5.0);
        assertEquals(5.0, dist.getEarthRadius());
        dist.setEarthRadius(1);
        assertEquals(1, dist.getEarthRadius());
    }

    @Test
    @DisplayName("Set places and get places in Distances request")
    public void testPlaces(){
        Places testPlaces = getTestPlaces();
        dist.setPlaces(testPlaces);
        assertEquals(testPlaces, dist.getPlaces());
    }

    @Test
    @DisplayName("Returns correct size of distances")
    public void testDistanceLength(){
        assertEquals(3, dist.getDistances().length);
    }

    @Test
    @DisplayName("Returns correct value from distances")
    public void testServerName() {
        assertEquals(0, dist.getDistances()[0]);
    }
}
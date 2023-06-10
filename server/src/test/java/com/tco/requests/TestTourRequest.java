package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestTourRequest {

    private TourRequest tour = new TourRequest();

    @Test
    @DisplayName("Tour does not change size of results")
    public void testTourSize(){
        for(int i = 0; i < 6; i++){
            tour = new TourRequest(buildPlaces(i, getTestLatitudes(), getTestLongitudes()), 10000, 1);
            tour.buildResponse();
            assertEquals(i, tour.getPlaces().size());
        }
    }

    @Test
    @DisplayName("Tour does not change first position")
    public void testTourFirstPosition(){
        for(int i = 1; i < 6; i++){
            Places places = buildPlaces(i, getTestLatitudes(), getTestLongitudes());
            tour = new TourRequest(places, 10000, 1);
            tour.buildResponse();
            assertEquals(places.get(0).get("name"), tour.getPlaces().get(0).get("name"));
        }
    }

    @Test
    @DisplayName("Tour does not change lists with values under or equal to 3")
    public void optimizesRightTrip(){
        for(int i = 0; i < 4; i++){
            Places places = buildPlaces(i, getTestLatitudes(), getTestLongitudes());
            tour = new TourRequest(places, 10000, 1);
            tour.buildResponse();
            assertEquals(true, places.equals(tour.getPlaces()));
        }
    }

    @Test
    @DisplayName("Tour returns a shortened trip")
    public void optimizesTrip(){
        Places places = buildPlaces(5,  getTestLatitudes(), getTestLongitudes());
        tour = new TourRequest(places, 10000, 1);
        tour.buildResponse();
        assertEquals(false, places.equals(tour.getPlaces()));
        assertEquals(true, getDistanceOfTrip(tour.getPlaces()) < getDistanceOfTrip(places));
    }

    public long getDistanceOfTrip(Places places){
        DistancesRequest dist = new DistancesRequest();
        dist.setPlaces(places);
        dist.setEarthRadius(10000);
        dist.buildResponse();
        long[] distances = dist.getDistances();
        long sum = 0;
        for(int i = 0; i < distances.length; i++)
            sum += distances[i];
        return sum;
    }

    @Test
    @DisplayName("Test Two Opt")
    public void testTwoOpt(){
        Places places = buildPlaces(500, getRandomLatitudes(500), getRandomLongitudes(500));
        tour = new TourRequest(places, 100000, 10);
        tour.buildResponse();
        assertEquals(false, places.equals(tour.getPlaces()));
    }

    @Test
    @DisplayName("Time Out During Two Opt")
    public void testTimeOut(){
        double[] longitudes = getRandomLongitudes(500);
        double[] latitudes = getRandomLatitudes(500);
        Places places = buildPlaces(500, latitudes, longitudes);
        tour = new TourRequest(places, 10000, 0.25);
        tour.buildResponse();
    }

    @Test
    @DisplayName("Test that it returns large list in less than a second")
    public void testWithinTime(){
        double[] longitudes = getRandomLongitudes(1000);
        double[] latitudes = getRandomLatitudes(1000);
        Places places = buildPlaces(1000, latitudes, longitudes);
        long startTime = System.currentTimeMillis();
        tour = new TourRequest(places, 10000, 1);
        long time = System.currentTimeMillis() - startTime;
        assertEquals(true, time < 1);
    }

    @Test
    @DisplayName("Test build Places Function")
    public void testBuildPlaces(){
        double[] longitudes = getTestLongitudes();
        double[] latitudes = getTestLatitudes();
        for(int i = 0; i < 6; i++){
            Places places = buildPlaces(i, latitudes, longitudes); 
            assertEquals(i, buildPlaces(i, latitudes, longitudes).size()); 
            for(int j = 0; j < places.size(); j++){
                Place place = places.get(j);
                assertEquals(true, place.containsKey("name"));
                assertEquals(true, place.containsKey("latitude"));
                assertEquals(true, place.containsKey("longitude"));
            }
        }
    }

    public Places buildPlaces(int size, double[] latitudes, double[] longitudes){
        Places places = new Places(size);
        size = (size > latitudes.length) ? latitudes.length : size;
        for(int i = 0; i < size; i++){
            Place place = new Place();
            place.put("name", String.valueOf(i));
            place.put("longitude", String.valueOf(longitudes[i]));
            place.put("latitude", String.valueOf(latitudes[i]));
            places.add(place);
        }
        return places;
    }

    public double[] getTestLatitudes(){
        double[] latitudes = {40.6699, 40.6792, 40.5047, 40.7626, 40.5390};
        return latitudes;
    }

    public double[] getTestLongitudes(){
        double[] longitudes = {-105.4165, -104.9578, -105.4028, -105.2009, -105.0430};
        return longitudes;
    }

    public double[] getRandomLatitudes(final int size){
        double[] latitudes = new double[size];
        for(int i = 0; i < size; i++){
            int sign = (i % 2 == 0) ? 1 : -1;
            latitudes[i] = getRandomCoordinate(90, sign); 
        }
        return latitudes;
    }

    public double[] getRandomLongitudes(final int size){
        double[] longitudes = new double[size];
        for(int i = 0; i < size; i++){
            int sign = (i % 2 == 0) ? 1 : -1;
            longitudes[i] = getRandomCoordinate(180, sign); 
        }
        return longitudes;
    }

    public double getRandomCoordinate(final int degrees, final int sign){
        return Math.random() * degrees * sign;
    }
}
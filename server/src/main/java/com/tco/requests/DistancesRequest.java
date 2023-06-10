package com.tco.requests;

import com.tco.misc.VincentyDistance;

import java.util.ArrayList;
import java.util.*;
import java.lang.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DistancesRequest extends Request {

    private Places places = new Places();
    private double earthRadius;
    private long[] distances; 
    private final transient Logger log = LoggerFactory.getLogger(DistancesRequest.class);

    @Override
    public void buildResponse() {
        setDistancesSize();
        if(distances.length > 1)
            calculateDistances();
        log.trace("buildResponse -> {}", this);
    }
    
    private void setDistancesSize(){
        distances = new long[places.size()];
    }

    private void calculateDistances(){
        calculateEachDistance(0);
        distances[distances.length-1] = calculateBootLeg();
    }

    private void calculateEachDistance(int index){
        distances[index] = (long)Math.round(calculateDistance(index));
        if(distances.length > ++index+1)
            calculateEachDistance(index);
    }

    private double calculateDistance(int index){
        VincentyDistance testDistance = new VincentyDistance(places.get(index), places.get(index+1), earthRadius);
        return (long)Math.round(earthRadius*testDistance.calculateDistance());
    }

    private long calculateBootLeg(){
        VincentyDistance lastDistance = new VincentyDistance(places.get(0), places.get(places.size()-1), earthRadius);
        return (long)Math.round(earthRadius*lastDistance.calculateDistance());
    }

    //Everything below here is for testing purposes
    public void setPlaces(Places newPlaces){
        places = newPlaces;
    }

    public Places getPlaces(){
        return places;
    }

    public void setEarthRadius(double newEarthRadius){
        earthRadius = newEarthRadius;
    }

    public double getEarthRadius(){
        return earthRadius;
    }

    public long[] getDistances(){
        return distances;
    }
}
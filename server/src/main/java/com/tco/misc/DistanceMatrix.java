package com.tco.misc;

import java.util.*;
import java.lang.*;

import com.tco.requests.Place;
import com.tco.requests.Places;

public class DistanceMatrix{
    long[][] distancesMatrix;
    double earthRadius;

    public DistanceMatrix(final Places places, final double earthRadius){
        this.earthRadius = earthRadius;
        buildDistancesMatrix(places, places.size());
    }

    private void buildDistancesMatrix(final Places places, final int size){
        distancesMatrix = new long[size][size];
        long[] distances = new long[size];
        VincentyDistance calculator = new VincentyDistance(earthRadius);
        for(int i = 0; i < size; i++){
            setDistancesRow(places, distances, calculator, i);
            for(int j = 0; j < size; j++)
                setDistance(distances, i, j);
        }
    }

    private void setDistancesRow(final Places places, final long[] distances, VincentyDistance calculator, int index){
        calculator.setPlaceOne(places.get(index));
        for(int i = index; ++index < distances.length; i++) {
            calculator.setPlaceTwo(places.get(index));
            distances[i] = (long)Math.ceil(earthRadius* calculator.calculateDistance());
        }
    }

    private void setDistance(final long[] distances, final int i, final int j){
        if(i == j)
            distancesMatrix[i][j] = 0;
        else if(i > j)
            distancesMatrix[i][j] = distancesMatrix[j][i];
        else
            distancesMatrix[i][j] = distances[j-1];
    }

    public long[][] getDistanceMatrix(){
        return distancesMatrix;
    }
}
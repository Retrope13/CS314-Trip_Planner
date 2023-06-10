package com.tco.requests;

import java.util.*;
import java.lang.*;

import com.tco.misc.VincentyDistance;
import com.tco.misc.DistanceMatrix;
import com.tco.misc.Timer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends Request {

    private Places places = new Places();
    private double earthRadius;
    private double response;
    private final transient Logger log = LoggerFactory.getLogger(TourRequest.class);

    public TourRequest(){
        super();
    }

    public TourRequest(Places places, double earthRadius, double response){
        super();
        this.places = places;
        this.earthRadius = earthRadius;
        this.response = response;
    }

    @Override
    public void buildResponse() {
        final long startTime = System.currentTimeMillis();
        final int size = places.size();
        if(size > 3 && response > 0)
            optimizeTrip(buildDistancesMatrix(size), new Timer(startTime, response));
        log.trace("buildResponse -> {}", this);
    }

    private long[][] buildDistancesMatrix(final int size){
        DistanceMatrix matrixMaker = new DistanceMatrix(places, earthRadius);
        return matrixMaker.getDistanceMatrix();
    }

    private void optimizeTrip(final long[][] distances, Timer timer){
        int[] best = nearestNeighborTrip(distances, getTourIndexes(distances[0].length), timer);
        if(!timer.timeLeft())
            best = twoOpt(distances, Arrays.copyOf(best, best.length+1), timer);
        shortenPlaces(best, findStart(best));
    }

    private int[] getTourIndexes(final int size){
        int[] tourIndexes = new int[size];
        for(int i = 0; i < tourIndexes.length; i++)
            tourIndexes[i] = i;
        return tourIndexes;
    }

    private int[] nearestNeighborTrip(final long[][] distances, int[] best, Timer timer){
        long bestDistance = totalDistance(best, distances);
        for(int i = 0; i < distances[0].length && timer.timeLeft(); i++){
            int current[] = nearestNeighbor(distances, i);
            if(totalDistance(current, distances) < bestDistance){ 
                best = current;
                bestDistance = totalDistance(best, distances);
            }
        }
        return best;
    }

    private long totalDistance(final int[] tour, final long[][] distances){
        long sum = distances[tour[0]][tour[tour.length-1]];
        for(int i = 0; i < tour.length-1; i++)
            sum += distances[tour[i]][tour[i+1]]; 
        return sum;
    }

    private int[] nearestNeighbor(final long[][] distances, int index){
        int[] tour = new int[distances[0].length];
        int[] unvisited = getTourIndexes(distances[0].length);
        tour[0] = index;
        unvisited[index] = -1;
        for(int i = 1; notEmpty(unvisited); i++){
            index = closest(distances, unvisited, index);
            tour[i] = index;
            unvisited[index] = -1;
        }
        return tour;
    }

    private boolean notEmpty(final int[] unvisited){
        for(int i = 0; i < unvisited.length; i++){
            if(unvisited[i] != -1) 
                return true;
        }
        return false;
    }

    private int closest(final long[][] distances, final int[] unvisited, final int next){
        int best = -1;
        long current;
        for(int i = 0; i < unvisited.length; i++){
            if(unvisited[i] == -1)
                continue;
            current = distances[next][unvisited[i]];
            if(best == -1 || current < distances[next][best])
                best = unvisited[i];
        }
        return best;
    }

    private int[] twoOpt(final long[][] distances, int[] newTour, Timer timer){
        newTour[newTour.length-1] = newTour[0];
        boolean improves = true;
        while(improves)
            improves = twoOptCycle(distances, newTour, timer);
        return Arrays.copyOf(newTour,newTour.length-1);
    }

    private boolean twoOptCycle(final long[][] distances, int[] tour, Timer timer){
        boolean improves = false;
        for(int i = 0; i < tour.length-3; i++){
            for(int j = i+2; j < tour.length-1; j++){
                if(!timer.timeLeft())
                    return false;
                if(twoOptImproves(distances, tour, i, j))
                    improves = swapIndexes(tour, i+1, j);
            }
        }
        return improves;
    }

    private boolean twoOptImproves(final long[][] d, int[] t, final int i, final int j){
        return distanceOf(d,t,i,j) + distanceOf(d,t,i+1,j+1)
               <
               distanceOf(d,t,i,i+1) + distanceOf(d,t,j,j+1);
    }

    private long distanceOf(final long[][] distances, int[] tour, final int i, final int j){
        return distances[tour[i]][tour[j]];
    }

    private boolean swapIndexes(int[] tour, int i, int j){
        while(i < j){
            int tempIndex = tour[i];
            tour[i++] = tour[j];
            tour[j--] = tempIndex;
        }
        return true;
    }

    private int findStart(final int[] tour){
        for(int i = 0; i < tour.length; i++)
            if(tour[i] == 0) 
                return i;
        return -1;
    }

    private void shortenPlaces(final int[] tour, final int start){
        Places newPlaces = new Places(tour.length);
        final int size = tour.length - 1;
        newPlaces.add(places.get(tour[start]));
        for(int i = iHelper(start, size); i != start; i = iHelper(i, size))
            newPlaces.add(places.get(tour[i]));
        places = newPlaces;
    }

    private int iHelper(final int i, final int size){
        return (i == size) ? 0 : i+1;
    }

    public Places getPlaces(){
        return places;
    }
}
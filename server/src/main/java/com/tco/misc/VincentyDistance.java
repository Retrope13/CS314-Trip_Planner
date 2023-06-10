package com.tco.misc;
import com.tco.requests.Place;
import java.util.*;
import java.lang.*;

/*modified from code by github user kungfoo | Silvio Heuberger @ IFS www.ifs.hsr.ch|
@ https://github.com/kungfoo/geohash-java*/

public class VincentyDistance{
    private double a, b;
    private double L, U1, U2, sinU1, cosU1, sinU2, cosU2;
    private double cos2SigmaM, cosSigma, sigma, lambda, sinSigma;

    public double lat1, lat2, long1, long2;

    public VincentyDistance(Place p1, Place p2, double earthRadius){
        setRadius(earthRadius);
        changePlaces(p1, p2);
    }
    
    public VincentyDistance(double earthRadius){
        setRadius(earthRadius);
    }

    public void setRadius(double radius){
        a = radius;
        b = radius;
    }

    public void changePlaces(Place p1, Place p2){
        setPlaceOne(p1);
        setPlaceTwo(p2);
    }

    public void setPlaceOne(Place p1){
        lat1 = Double.parseDouble(p1.get("latitude"));
        long1 = Double.parseDouble(p1.get("longitude"));
    }

    public void setPlaceTwo(Place p2){
        lat2 = Double.parseDouble(p2.get("latitude"));
        long2 = Double.parseDouble(p2.get("longitude"));
    }

    public double calculateDistance(){
        if(!startCalc())
            return 0.00;
        return sigma; 
    } 

    private boolean startCalc(){
        buildValues();
        setSinSigma();
        if (sinSigma == 0)
            return false;
        setSigmas();
        return true;
    }

    public void buildValues(){
        lambda = Math.toRadians(long2 - long1);
        U1 = Math.atan(Math.tan(Math.toRadians(lat1)));
        U2 = Math.atan(Math.tan(Math.toRadians(lat2)));
        sinU1 = Math.sin(U1);
        cosU1 = Math.cos(U1);
        sinU2 = Math.sin(U2);
        cosU2 = Math.cos(U2);
    }

    private void setSinSigma(){
        double sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        sinSigma = Math.sqrt( (cosU2 * sinLambda)
            * (cosU2 * sinLambda)
            + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
            * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
        );
    }

    private void setSigmas(){
        double sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
        sigma = Math.atan2(sinSigma, cosSigma);
    }
}
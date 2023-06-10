package com.tco.misc;

import java.util.*;
import java.lang.*;

import com.tco.requests.Place;
import com.tco.requests.Places;

public class Timer{
    final private long startTime;
    final private double response;
    
    public Timer(final long startTime, final double response){
        this.startTime = startTime;
        this.response = response;
    }

    private boolean timeOver(final long quitTime, final double multiplier){
        return ((System.currentTimeMillis() - startTime) * multiplier < response * quitTime);
    }

    public boolean timeLeft(){
        return timeOver(750, 1);
    }
}
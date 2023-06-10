package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import java.util.Arrays;

public class FindRequest extends Request {

    private String match;
    private Integer limit;
    private Integer found;
    private String[] type;
    private String[] where;
    
    private Places places = new Places();
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    // connection information when using port forwarding from local host
    private final static String DB_URL = getDB_URL();
    private final static String DB_USER = "cs314-db";
    private final static String DB_PASSWORD = "eiK5liet1uej";

    private static String getDB_URL(){
        String env = System.getenv("CS314_TUNNEL");
        String nonCsComputer = "jdbc:mariadb://127.0.0.1:56247/cs314";
        String csComputer = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
        return (env != null && env.equals("true")) ? nonCsComputer : csComputer;
    }

    @Override
    public void buildResponse() {
        setValues();
        log.trace("buildResponse -> {}", this);
    }

    public void setValues(){
        found = 0;
        places = findQuery();
    }

    public Places findQuery(){
        try (Statement query = buildConnection();) {
            addPlaces(query.executeQuery(getSearchQuery()));
            found = countResults(query.executeQuery(getCountQuery()));
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return places;
    }

    public Statement buildConnection() throws java.sql.SQLException{
        Connection conn = DriverManager.getConnection(getDB_URL(), DB_USER, DB_PASSWORD);
        return conn.createStatement();
    }

    public String getSearchQuery(){
        String searchQuery = "SELECT type, world.name, world.latitude, world.longitude, world.municipality, region.name as region, country.name as country, continent.name as continent";
        searchQuery += (match.isEmpty()) ? getRandomQuery() : getQuery();
        return (limit > 0) ? searchQuery + " LIMIT " + limit + ";" : searchQuery;
    }

    public String getRandomQuery(){
        return " FROM world INNER JOIN continent ON world.continent = continent.id INNER JOIN country ON world.iso_country = country.id INNER JOIN region ON world.iso_region = region.id " + getTypeQuery() + getWhereQuery() + "ORDER BY RAND()";
    }

    public String getCountQuery(){
        String count = "SELECT COUNT(world.name) ";
        count += (match.isEmpty()) ? getRandomQuery() : getQuery(); 
        return count;
    }

    public String getTypeQuery(){
        if (type==null || type.length == 0)return "";

        String ret = "";
        if (!match.isEmpty()){
            ret = " AND (";
        }
        else{
            ret = " WHERE (";
        }
        ret += type[0].equals("other") ? " type = \"closed\" OR type = \"seaplane_base\" " : " type LIKE '%" + type[0] + "%' ";
        ret += typeLoop(type);
        
        return ret + ")";
    }

    public String typeLoop(String[] type){
        String ret = "";
        int i = 1;
        while (i < type.length && type[i] != null){
            ret += type[i].equals("other") ? "OR type = \"closed\" OR type = \"seaplane_base\" " : "OR type LIKE '%" + type[i] + "%' ";
            i++;
        }
        return ret;
    }

    public String getWhereQuery(){
        if (where==null || where.length == 0)return "";
        if (Arrays.asList(where).contains("Côte d\'Ivoire")){
            where[Arrays.asList(where).indexOf("Côte d\'Ivoire")] = "Côte d\'\'Ivoire";
        }
        String ret = "";
        if (!match.isEmpty() || type!=null){
            ret = " AND (";
        }
        else{
            ret = " WHERE (";
        }
        ret += " country.name = '" + where[0] + "' ";
        int i = 1;
        while (i < where.length && where[i] != null){
            ret += " OR country.name = '" + where[i] + "' ";
            //ret += type[i].equals("other") ? "OR type = \"closed\" OR type = \"seaplane_base\" " : "OR type LIKE '%" + type[i] + "%' ";
            i++;
        }
        return ret + ")";
    }
    public String getQuery(){
        return " FROM world INNER JOIN continent ON world.continent = continent.id INNER JOIN country ON world.iso_country = country.id INNER JOIN region ON world.iso_region = region.id WHERE (world.name LIKE '%" + match + "%' OR country.name LIKE '%" + match + "%' OR region.name LIKE '%" + match + "%' OR world.municipality LIKE '%" + match + "%' OR world.id LIKE '%" + match + "%')" + getTypeQuery() + getWhereQuery();
    }

    public void addPlaces(ResultSet results) throws java.sql.SQLException{
        while(results.next()){
            Place place = new Place();
            place.put("name", results.getString("world.name"));
            place.put("latitude", results.getString("latitude"));
            place.put("longitude", results.getString("longitude"));
            places.add(place);
        }
    }

    public Integer countResults(ResultSet results) throws java.sql.SQLException{
        Integer counter = found;
        while (results.next()) 
             counter = results.getInt(1);
        return counter;
    }
     /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public void setMatch(String testMatch){
        match = testMatch;
    }

    public String getMatch(){
        return match;
    }

    public void setLimit(int testLimit){
        limit = testLimit;
    }

    public int getLimit(){
        return limit;
    }

    public int getFound(){
        return found;
    }

    public Places getPlaces(){
        return places;
    }

    public void setType(String[] types){
        type = types.clone();
    }

    public void setWhere(String[] whereList){
        where = whereList.clone();
    }
}
    

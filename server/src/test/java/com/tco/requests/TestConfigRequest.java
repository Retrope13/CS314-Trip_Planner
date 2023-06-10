package com.tco.requests;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TestConfigRequest {

    private ConfigRequest conf;

    @BeforeEach
    public void createConfigurationForTestCases() {
        conf = new ConfigRequest();
        conf.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"config\"")
    public void testType() {
        String type = conf.getRequestType();
        assertEquals("config", type);
    }

    @Test
    @DisplayName("Features includes \"config\",\"find\" and \"distances\"")
    public void testFeatures(){
        assertTrue(conf.validFeature("config"));
        assertTrue(conf.validFeature("find"));
        assertTrue(conf.validFeature("distances"));
        assertTrue(conf.validFeature("tour"));
        assertTrue(conf.validFeature("type"));
        assertTrue(conf.validFeature("where"));
    }

    @Test
    @DisplayName("Team name is correct")
    public void testServerName() {
        String name = conf.getServerName();
        assertEquals("t21 Ctrl Alt Elite", name);
    }
}
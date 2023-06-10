import ulog from 'ulog';

export function setLogLevelIfDefault() {
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    if (!urlParams.has("log")) {
        if (process.env.CLIENT_LOG_LEVEL === "INFO") {
            ulog.level = ulog.INFO;
        } else {
            ulog.level = ulog.ERROR;
        }
    }
}

setLogLevelIfDefault();

export const LOG = ulog("App");

export const CLIENT_TEAM_NAME = "t21 Ctrl Alt Elite";

export const EARTH_RADIUS_UNITS_DEFAULT = [ 
                                            { "unit": "miles", "value": 3959.00 },
                                            { "unit": "nautical miles", "value": 3440 },
                                            { "unit": "yards", "value": 6967840 },
                                            { "unit": "feet", "value": 20903520 },
                                            { "unit": "kilometers", "value": 6371.393 },
                                            { "unit": "meters", "value": 6371393.0 }
                                          ];

export const DEFAULT_STARTING_PLACE = { latitude: 40.5734, longitude: -105.0865 };

export const DEFAULT_TRIP_NAME = "My Trip";
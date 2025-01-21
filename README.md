# metorite_landings
Data interpretation of meteorite landings from NASA using JSON and CSV input formats from: https://catalog.data.gov/dataset/meteorite-landings.
The project has one page of description and other information according to the project, and two web pages containing map and graph data visualization.

Project web page: https://uhnv.github.io/metorite_landings/

Analyzing data:
Below is one of the entries from the provided JSON. Each row has its own index (as arrays do) from here I can see that Place has an index = 8, Classification = 11, Mass = 12, Fall status = 13 (I think this is whether it fell or was detected but did not reach the Earth), Date = 14, Latitude and Longitude = 15 and 16 respectively.

```json
 [
    "row-f5v9.j7t3.nzbw",                            // <---- Index 0 not used
    "00000000-0000-0000-F4CA-DBB297FEFED1",          //<---- Index 1 not used
    0, 1446143734, null, 1446143734, null, "{ }",    // <---- Indexes 2...7 not used
    "Allegan",                                       // <---- Index 8 Place
    "2276",
    "Valid",
    "H5",                                            // <---- Index 11 Class not used
    "32000",                                         // <---- Index 12 Mass
    "Fell",                                          // <---- Index 13 Fell status
    "1899-01-01T00:00:00",                           // <---- Index 14 Date
    "42.533330",                                     // <---- Index 15 Latitude
    "-85.883330",                                    // <---- Index 16 Longitude
    [null, "42.53333",
        "-85.88333",
        null, false],
        "50",
        "429"
    ]
```
The project is done using two JS libraries:
- https://leafletjs.com/ open source map to visualize JSON data;
- https://www.chartjs.org/ open source HTML chart library to consume data from CSV file.

On the map visualization page the latitude and longitude are used to put the marker on the map, as well as other "meaningful" information about a particular meteorite is used to provide some brief info in a popup window above each marker.

Chart page has pie chart and a bar chart. The pie chart contains data of different types of the meteorites, and bar chart contains data for the sizes of the meteorites.


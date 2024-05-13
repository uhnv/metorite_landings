# metorite_landings
Data interpretation for meteorite landings from NASA: https://catalog.data.gov/dataset/meteorite-landings

I pull all the "meaningfull data" (as I can understand that from analyzing JSON and CSV files provided).

Analyzing data:
Below is the one of the entries in provided (tabular) JSON in its Data section. each ro has its own index (as arrays do) from here I can see that Place has an index = 8, Classification = 11, Mass = 12, Fall status = 13 (I think this is wheter it fell or was detected but did not reach the Earth), Date = 14,  Latitude and Longitude = 15 and 16 respectively.
 [
      "row-f5v9.j7t3.nzbw",                             <---- Index 0 not used
      "00000000-0000-0000-F4CA-DBB297FEFED1",           <---- Index 1 not used
      0, 1446143734, null, 1446143734, null, "{ }",     <---- Indexes 2...7 not used
      "Allegan",                                        <---- Index 8 Place
      "2276", 
      "Valid",
      "H5",                                             <---- Index 11 Class not used
      "32000",                                          <---- Index 12 Mass
      "Fell",                                           <---- Index 13 Fell status
      "1899-01-01T00:00:00",                            <---- Index 14 Date
      "42.533330",                                      <---- Index 15 Latitude
      "-85.883330",                                     <---- Index 16 Longitude
      [null, "42.53333",
        "-85.88333",
        null, false],
      "50",
      "429"
    ],


    https://leafletjs.com/ library is used for data visualization and interpretetion. 
    Latitude and longitude are used to put the marker on the map and other "meaningful" information about particular meteorite is used to provide some brief info for the users in popup window above each merker.
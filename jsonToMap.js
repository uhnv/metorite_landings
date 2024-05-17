// Initialize the map
var map = L.map('map').setView([20, 10], 2); // Centered at (20,10) with zoom level 3

// Add the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fetch the JSON data from the NASA API URL
fetch('https://data.nasa.gov/api/views/gh4g-9sfh/rows.json?accessType=DOWNLOAD')
  .then(response => response.json())
  .then(data => {
    // Extract the rows containing meteorite data
    var rows = data.data;

    /* 
     * Parse the rows of data from JSON, retrieve needed information, filter out invalid data, 
     * add each geolocation to the map using circles and additional info using pop-up windows.
    */
    let meteoriteCounter = 0;
    let invalidDataCounter = 0;
    rows.forEach(function (row) {
      const latitude = parseFloat(row[15]);
      const longitude = parseFloat(row[16]);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        L.circleMarker([latitude, longitude]).addTo(map)
          .bindPopup(`Place: ${row[8]}, <br>Mass (g): ${row[12]}, <br>Fell status: ${row[13]}, <br> Year: ${row[14]}`);
        //.openPopup();
        meteoriteCounter++;
      } else { 
        invalidDataCounter++;
        //console.warn(`Invalid latitude or longitude value in row: ${row}`);
      }
    });
    // Print out the valid/invalid, and total number of meteorites on the map
    console.log(`Invalid data entries count: ${invalidDataCounter}`)
    console.log(`Valid data entries count: ${meteoriteCounter}`);
    console.log(`Total data entries count: ${meteoriteCounter + invalidDataCounter}`);
  })
  .catch(error => console.error('Error fetching data:', error));


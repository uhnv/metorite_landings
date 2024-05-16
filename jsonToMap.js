// Initialize the map
var map = L.map('map').setView([20, 10], 3); // Centered at (20,10) with zoom level 3

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
 * Parse the rows of data from JSON, retrieve needed information, 
 * and add this information to the map using markers and pop-up windows
*/
rows.forEach(function(row) {
    let latitude = parseFloat(row[15]);
    let longitude = parseFloat(row[16]);
    L.marker([latitude, longitude]).addTo(map)
    .bindPopup(`Place: ${row[8]}, <br>Mass (g): ${row[12]}, <br>Fell status: ${row[13]}, <br> Year: ${row[14]}`)
    //.openPopup();
    });
    
})
.catch(error => console.error('Error fetching data:', error));
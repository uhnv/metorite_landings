// Local CSV file containing meteorite data
const csvFile = 'Meteorite_Landings.csv';

// Declare two empty arrays to store data for the diagrams.
const meteoriteClass = [];
const meteoriteMass = [];

// Function to parse CSV data
function parseCSVData(csvData) {
    const rows = csvData.split(/\n|\r/).slice(1).filter(row => row.trim() !== '');
    // console.log(rows);        //<----- test parsed csv file

    const parsedData = [];

    rows.forEach(row => {
        const columns = row.split(',');
        const rowData = {
            recclass: columns[3],
            mass: parseInt(columns[4])
        };
        parsedData.push(rowData);
    });
console.log(parsedData);           //<--------- test array of objects  {recclass: " ", mass: " "}
    return parsedData;
}

// Function to fetch and parse local CSV file
async function fetchAndParseCSV(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error('Response was not ok');
        }
        const text = await response.text();
        // Parse CSV data
        const parsedData = parseCSVData(text);
        return parsedData;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Fetch and parse local CSV file
fetchAndParseCSV(csvFile)
    .then(data => {
        if (data) {
            // Use the parsed data here
            data.forEach(meteorite => {
                meteoriteClass.push(meteorite.recclass.replace(/^"|"$/g, ''));
                meteoriteMass.push(meteorite.mass);
            });
            console.log(meteoriteClass);              // <---------  Array containing meteorite class 
            console.log(meteoriteMass);               // <---------  Array containing meteorite mass 

            // Count percentage for each meteorite class, and make a chart
            const classCounts = meteoriteClass.reduce((counts, meteorClass) => {
                counts[meteorClass] = (counts[meteorClass] || 0) + 1;
                return counts;
            }, {});

            const totalCount = Object.values(classCounts).reduce((total, count) => total + count, 0);

            const classPercentages = Object.fromEntries(
                Object.entries(classCounts).map(([meteorClass, count]) => [meteorClass, (count / totalCount) * 100])
            );

            const labels = Object.keys(classPercentages);
            const dataPoints = Object.values(classPercentages);

            // *********           Build pie chart using Chart.js           *********/
            const ctxPie = document.getElementById('meteoritePieChart').getContext('2d');
            new Chart(ctxPie, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataPoints,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9933', '#33CC33', '#FF0000', '#0000FF', '#00FF00', '#FF6600', '#6600CC', '#FF6666'],
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Meteorite Class Distribution'
                    }
                }
            });

            // Count mass distribution. No NaN values count.
            const massCounts = meteoriteMass.reduce((counts, mass) => {
                if (mass < 1000) counts['less than 1kg'] = (counts['less than 1kg'] || 0) + 1;
                else if (mass >= 1000 && mass < 5000) counts['1-5 kg'] = (counts['1-5 kg'] || 0) + 1;
                else if (mass >= 3000 && mass < 5000) counts['3-5 kg'] = (counts['3-5 kg'] || 0) + 1;
                else if (mass >= 5000 && mass < 25000) counts['5-25 kg'] = (counts['5-25 kg'] || 0) + 1;
                else counts['more than 25 kg'] = (counts['more than 25 kg'] || 0) + 1;
                // console.log(counts);
                return counts;
            }, {});
            

            const massLabels = Object.keys(massCounts);
            const massDataPoints = Object.values(massCounts);

            //*************      Build bar chart for mass using Chart.js          **********/
            const ctxBar = document.getElementById('meteoriteMassChart').getContext('2d');
            new Chart(ctxBar, {
                type: 'bar',
                data: {
                    labels: massLabels,
                    datasets: [{
                        label: 'Meteorite Mass Distribution',
                        data: massDataPoints,
                        borderWidth: 2,
                        borderColor: '#A60F2D',
                        backgroundColor: '#808080'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                        
                    }
                }
            });
        }
    });

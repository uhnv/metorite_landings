// Function to fetch and parse CSV file
async function fetchAndParseCSV("./Meteorite_Landings.csv") {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        // Parse CSV data
        const rows = text.split('\n').map(row => row.split(','));
        return rows;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// CSV file containing meteorite classifications
const csvURL = 'Meteorite_Landings.csv';

// Fetch and parse CSV file
fetchAndParseCSV(csvURL)
    .then(data => {
        if (data) {
            // Extract classifications from CSV data
            const classifications = data.map(row => row[3]); // Assuming classification is in column 4 (index 3)

            // Count occurrences of each classification
            const classificationCounts = {};
            classifications.forEach(classification => {
                if (classificationCounts[classification]) {
                    classificationCounts[classification]++;
                } else {
                    classificationCounts[classification] = 1;
                }
            });

            // Prepare data for chart
            const labels = Object.keys(classificationCounts);
            const dataPoints = Object.values(classificationCounts);

            // Create a bar chart using Chart.js
            const ctx = document.getElementById('meteoriteChart').getContext('2d');
            const meteoriteChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Meteorite Classifications',
                        data: dataPoints,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
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
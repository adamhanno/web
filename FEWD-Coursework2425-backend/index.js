const express = require('express');
const fs = require('fs');
const csv = require('csv-parser'); // CSV parsing library
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

// Function to read and parse the CSV file
const getCSVData = () => {
  return new Promise((resolve, reject) => {
    const results = [];

    // Read the CSV file and parse the data
    fs.createReadStream('conf.db') // conf.db is now a CSV file
      .pipe(csv()) // Use csv-parser to parse the CSV data
      .on('data', (row) => {
        // Map the CSV data to the desired structure
        const formattedRow = {
          id: row.id || "", // Assuming you have an ID column in CSV
          speaker: row.speaker || "", // Assuming you have a speaker column in CSV
          title: row.title || "",
          description: row.description || "",
          session: row.session || "",
          time: row.time || "",
          tags: row.tags ? row.tags.split(',') : [], // Assuming CSV tags are comma-separated
          ratings: row.ratings ? row.ratings.split(',').map(Number) : [], // Assuming ratings are comma-separated
          _id: row._id || "", // Assuming _id is a column in the CSV
        };
        results.push(formattedRow);
      })
      .on('end', () => {
        resolve(results); // Resolve with the parsed and formatted CSV data
      })
      .on('error', (err) => {
        console.error("Error reading CSV file:", err.message);
        reject(err); // Reject if there's an error reading the file
      });
  });
};

// API endpoint to get the CSV data as JSON
app.get('/data', async (req, res) => {
  try {
    const data = await getCSVData();
    res.json(data); // Send parsed CSV data as JSON response
  } catch (err) {
    res.status(500).json({ error: "Failed to load data from the CSV file", details: err.message });
  }
});

// Save CSV data to a JSON file
app.get('/save-json', async (req, res) => {
  try {
    const data = await getCSVData();
    if (data.length === 0) {
      res.status(400).send('No data found in the CSV file.');
      return;
    }

    // Write data to a JSON file
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to save data to JSON file', details: err.message });
      } else {
        res.send('Data has been saved to data.json');
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve data', details: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

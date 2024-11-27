const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs"); // Add this line to import the 'fs' module

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "MINUTO MAGAZINE" directory (project directory)
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file when accessing the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission
app.post("/submit", (req, res) => {
  const formData = req.body;

  // Create a data string to store
  const dataString = `Name: ${formData.fullName}, Email: ${formData.email}, Source: ${formData.source}, Ad Space: ${formData.adSpace}\n`;

  // Store the data in a text file
  fs.appendFile(path.join(__dirname, "submissions.txt"), dataString, (err) => {
    if (err) {
      console.error("Error saving data:", err);
      res.status(500).send("There was a problem saving your information.");
    } else {
      console.log("Data saved successfully");
      res.send("Form submitted successfully!");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

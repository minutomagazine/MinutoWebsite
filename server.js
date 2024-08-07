const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Handle form submission
app.post("/submit", (req, res) => {
  const { fullName, email, source, adSpace } = req.body;
  console.log(
    `Full Name: ${fullName}, Email: ${email}, Source: ${source}, Ad Space: ${adSpace}`
  );
  res.send("Form submitted successfully!");
});

// Serve the form HTML from its location
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

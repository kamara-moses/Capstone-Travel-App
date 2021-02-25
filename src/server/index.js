const dotenv = require("dotenv");
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server is running on port ${port}`);
}

// GET route
app.get("/", function (req, res) {
    res.sendFile("dist/index.html")
})


// API
const geoNameURL = "http://api.geonames.org/searchJSON?q"
const userName = process.env.USERNAME
console.log(`Your Username is ${process.env.USERNAME}`)

// POSt Route
app.post("/geoName", async function(req, res) {
    projectData = req.body.city;
    console.log(`You entered: ${projectData}`);
    const geoURL = `${geoNameURL}=${city}&maxRows=1&username=${userName}`

    const response = await fetch(geoURL)
    const geoData = await response.json()
    console.log(goeData)
    res.send(geoData)
})
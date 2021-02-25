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
const fetch = require("node-fetch")


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

// POSt Route
app.post('/geoName', async(req, res) => {
    const url = `http://api.geonames.org/searchJSON?q=${req.body.location}&maxRows=1&username=${process.env.USERNAME}`;
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data)
        let coordinates = {
            lat: data.geonames[0].lat,
            long: data.geonames[0].lng
        };
        res.send(coordinates);
    } catch (error) {
        console.log("Error", error);
    }
})


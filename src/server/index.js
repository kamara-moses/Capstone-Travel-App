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
app.use(express.static('website'));


// Setup Server
const port = 8081;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server is running on port ${port}`);
}

// GET route
app.get('/retrieve', getData);

function getData(req, res) {
    res.send(projectData);
}

// POST route
app.post('/add', postData);

function postData(req, res) {
    projectData = req.body;
    res.send({ message: "Post received" })
    console.log(projectData)
}


// // POST Routes
// app.post('/api', function(req, res) {
//     const { date, city } = req.body;
//     // Connect to Geonames Api
// const geoNames = (`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.USERNAME}`)
//     fetch(geoNames)
//     .then(res => res.json())
//     .then(json => {
//         // Latitude and Longitude
//         const lat = json.geonames[0].lat;
//         const lng = json.geonames[0].lng
//     })
// // Connect to Weather Api
// const weatherBit = (`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERKEY}`)
//     fetch(weatherBit)
//     .then(res => res.json())
//     .then(json => {
//         const summary = json.daily.data[0].summary;
//         const tempHigh = json.daily.data[0].temperatureHigh;
//         const tempLow = json.daily.data[0].temperatureLow;
//     })
// const pixabay = (`https://pixabay.com/api/?key=${process.env.PIXAKEY}&q=${city}&image_type=photo`)
//     fetch(pixabay)
//     .then(res => res.json())
//     .then(json => {
//         const image = json.hits[0].webFormatURL;
//         const pixObj = { summary: summary, tempHigh: tempHigh, tempLow: tempLow, image: image}
//         res.send(pixObj);
//     })
// });


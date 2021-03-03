const dotenv = require("dotenv");
dotenv.config();

// const path = require("path");

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

console.log(__dirname);

// Initialize the main project folder
app.use(express.static("dist"));

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// Setup Server
const port = 8001;
const server = app.listen(port, listening);

function listening() {
  console.log(`Server is running on port ${port}`);
}

  app.post('/getCity', async(req, res) => {
    const url = `http://api.geonames.org/searchJSON?q=${req.body.city}&maxRows=1&username=${process.env.USERNAME}`;
    const response = await fetch(url);
    try {
        const data = await response.json();
        let coordinates = {
            lat: data.geonames[0].lat,
            lon: data.geonames[0].lng
        };
        res.send(coordinates);
    } catch (error) {
        console.log("Error", error);
    }
})

app.post('/getWeather', async(req, res) => {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.lon}&key=${process.env.WEATHERKEY}`;
    const response = await fetch(url)
    try {
        const data = await response.json();
        res.send(data);
    } catch(error) {
        console.log("Error", error);
    }
})

app.post('/getPic', async(req, res) => {
    const url = `https://pixabay.com/api/?key=${process.env.PIXAKEY}&q=${req.body.city}&image_type=photo`;
    const response = await fetch(url)
    try {
        const data = await response.json();
        res.send(data);
    } catch(error) {
        console.log("Error", error);
    }
})

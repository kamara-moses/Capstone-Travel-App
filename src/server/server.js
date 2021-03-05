const dotenv = require("dotenv");
dotenv.config();
const fetch = require("node-fetch");

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
const port = 8081;
const server = app.listen(port, listening);

function listening() {
  console.log(`Server is running on port ${port}`);
}

app.post("/getWeather", function (req, res) {
  const { city } = req.body;
  // Call to the geonames API
  const geoNames = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${process.env.USERNAME}`;
  console.log(`${process.env.USERNAME}`)
  fetch(geoNames)
    .then((res) => res.json())
    .then((json) => {
      // getting latitude and longitude
      const lat = json.geonames[0].lat;
      const lng = json.geonames[0].lng;
      console.log(geoNames)
      console.log(lat)
      console.log(lng)

      // Call to the weatherbit API
      const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.WEATHERKEY}`;
      console.log(`${process.env.USERNAME}`)
      fetch(weatherBit)
        .then((res) => res.json())
        .then((json) => { 
            console.log(json);
            const description = json.data[0].weather.description;
            const tempHigh = json.data[0].high_temp;
            const tempLow = json.data[0].low_temp;
            
          // Call to the pixabay API
          const pixaBay = `https://pixabay.com/api/?key=${process.env.PIXAKEY}&q=${city}&image_type=photo`;
          fetch(pixaBay)
            .then((res) => res.json())
            .then((json) => {
                console.log(json)
              const img = json.hits[0].webformatURL;
              const pixObj = { description: description, tempHigh: tempHigh, tempLow: tempLow, img: img };
              res.send(pixObj);
              console.log(pixObj)
            });
        });
    });
});

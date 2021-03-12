// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

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

// Asked a question on stackoverflow in regards to chaining.
// I was giving an example of how to make chaining api calls
// One user suggested moving the api call from the client side to the server side.
app.post("/getWeather", projectData = (req, res) => {
  const { city } = req.body;
  // Call to the geonames API
  const geoNames = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=kamara.moses`;
  fetch(geoNames)
    .then((res) => res.json())
    .then((json) => {
      // getting latitude and longitude
      const lat = json.geonames[0].lat;
      const lng = json.geonames[0].lng;
      console.log(geoNames);
      console.log(lat);
      console.log(lng);

      // Call to the weatherbit API
      const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=cda6df51d9a24b8c9d54b830f4eadb51`;
      fetch(weatherBit)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          const icon = json.data[0].weather.icon;
          const description = json.data[0].weather.description;
          const highTemp = json.data[0].high_temp;
          const lowTemp = json.data[0].low_temp;

          // Call to the pixabay API
          const pixaBay = `https://pixabay.com/api/?key=19853981-85155ca595da994be43f034e6&q=${city}&image_type=photo`;
          fetch(pixaBay)
            .then((res) => res.json())
            .then((json) => {
              console.log(json);
              const image = json.hits[0].webformatURL;
              const pixObj = {
                city: city,
                icon: icon,
                description: description,
                highTemp: highTemp,
                lowTemp: lowTemp,
                image: image,
              };
              res.send(pixObj);
              console.log(pixObj);
            });
        });
    });
});

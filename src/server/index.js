const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

// Start up an instance of app
const app = express()

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

/** GET Router */
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

/** POST Router */

// Geonames
const geoBaseURL = 'http://api.geonames.org/searchJSON?q'
const userName = process.env.USERNAME
console.log(`Your username for geonames is ${process.env.USERNAME}`);

// to receive the POST sent from the client
app.post('/city', async function(req, res) {
    city = encodeURI(req.body.city); 
    console.log(`Trip destination: ${req.body.city}`);

    const fetchGeo = await fetch (`${geoBaseURL}=${city}&maxRows=1&username=${userName}`)
    const geoInJson = await fetchGeo.json()
});

// Weatherbit
const weatherBaseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const wKey = process.env.WKEY
console.log(`Your API key for weatherbit is ${process.env.WKEY}`)

// to receive the POST sent from the client
app.post('/weather', async function(req, res) {
    lat = req.body.lat;
    lon = req.body.lon;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    const fetchWeather = await fetch (`${weatherBaseURL}&lat=${lat}&lon=${lon}&days=3&key=${wKey}`)
    const weatherInJson = await fetchWeather.json()
    res.send(weatherInJson)
});

// Pixabay
const pixabayBaseURL = 'https://pixabay.com/api/?'
const pKey = process.env.PKEY
console.log(`Your API key for pixabay is ${process.env.PKEY}`)

// to receive the POST sent from the client
app.post('/pic', async function(req, res) {
    // remove whitespaces and replace it with '+'
    // ref: https://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with
    cityName = encodeURI(req.body.city).replace('%20', '+');
    countryName = encodeURI(req.body.country).replace('%20', '+');
    console.log(`Image search with a keyword: ${req.body.city}`)

    const fetchPic1 = await fetch (`${pixabayBaseURL}key=${pKey}&q=${cityName}&image_type=photo&orientation=horizontal&per_page=3&pretty=true`)
    try {
        const picInJson1 = await fetchPic1.json()
        if(picInJson1.totalHits > 0) {
            res.send(picInJson1)
            console.log('Image found!')
        } else {
            console.log(`No image found, now search with a keyword: ${req.body.country}`)
            try {
                const fetchPic2 = await fetch (`${pixabayBaseURL}key=${pKey}&q=${countryName}&image_type=photo&orientation=horizontal&per_page=3&pretty=true`)
                const picInJson2 = await fetchPic2.json()
                res.send(picInJson2)
                console.log('Image found!')
            } catch(error) {
                console.log(error)
            }
        }
    } catch(error) {
        console.log(error)
    }
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Travel app listening on port 8081!')
})

module.exports = { app }
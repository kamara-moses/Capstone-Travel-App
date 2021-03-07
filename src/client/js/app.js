/* Global Variables */

// The URL root if user searches by city
const API_ROOT_CITY = "http://api.geonames.org/searchJSON?q=";

// PARAMS FOR Geonames
const API_ROOT_PARAMS = "&maxRows=1&username="

// The URL for api key parameter
const API_KEY = `kamara.moses`;

// WeatherBit URL
const API_ROOT_BIT = "https://api.weatherbit.io/v2.0/forecast/daily?"

const API_BIT_PARAMS = "&city="

const API_BIT_KEY = "&key="

const BIT_KEY = "cda6df51d9a24b8c9d54b830f4eadb51"

// Find the Generate button and add the listener
const goButton = document.getElementById("generate");
goButton.addEventListener("click", clickRespond);

// Main function of the program
// Grabs the user"s input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {

   // Grab user"s input
    const cityInput = document.getElementById("city");
    const dateInput = document.getElementById("depart");

    let degreeSystem;
   

    // Read values of zip and city
    const city = cityInput.value;
    const date = dateInput.value;

    // Form URL based on zip or city search
    // (zip takes precendence if both were entered)
    let url;
    let bitURL;
  
    if (city) {
        url = API_ROOT_CITY + city + API_ROOT_PARAMS + API_KEY;
        bitURL = API_ROOT_BIT + API_BIT_PARAMS + city + API_BIT_KEY + BIT_KEY;
    }

    // Call the API
    getGeo(url)
    

        // Prepares data for POST, calls the POST
        .then(function (geoNames) {
            console.log(geoNames)
            const errorMessage = document.getElementById("error");
            if (geoNames.cod == "200") {
                errorMessage.classList.add("hide");
                const city = geoNames.geonames[0].city;
                const countryName = geoNames.geonames[0].countryName;
                const lat = geoNames.geonames[0].lat;
                const lng = geoNames.geonames[0].lng;
                postJournal("/add", { city, countryName, lat, lng });

                // Calls to update the site with latest entry
                updateUI(degreeSystem);

            } else {
                console.log("Bad data entered");
                errorMessage.classList.remove("hide");
                return;
            }
        })

        getWeather(bitURL)
        .then(function (weatherData) {
            console.log(weatherData)
            const errorMessage = document.getElementById('error');
            if (weatherData.cod == "200") {
                errorMessage.classList.add('hide');
                const icon = weatherData.data[0].weather.icon;
                const description = weatherData.data[0].weather.description
                const date = dateTime();
                const highTemp = weatherData.data[0].high_temp;
                const lowTemp = weatherData.data[0].low_temp
                postJournal('/add', { icon, description, date, highTemp, lowTemp  });

                // Calls to update the site with latest entry
                updateUI(degreeSystem);

            } else {
                console.log('Bad data entered');
                errorMessage.classList.remove('hide');
                return;
            }
        })
}

// Calls the API, converts response to JSON
// returns geoNames JSON object
async function getGeo(url) {
    const response = await fetch(url);
    const geoNames = await response.json();
    return geoNames;
}

async function getWeather(bitURL) {
    const response = await fetch(bitURL);
    const weatherBit = await response.json();
    return weatherBit;
}

// POSTs the journal data (icon, date/time, temperature, feelings)
async function postJournal(url, data) {
    await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data)
    });
}


// Updates the website"s latest entry card
// Includes weather icon, date, temperature, feelings
// Shows the card if it"s hidden
async function updateUI(degreeSystem) {
    const response = await fetch("/retrieve");
    const latestEntry = await response.json();
    document.getElementById("icon").innerHTML = `<img class="icon" src="http://openweathermap.org/img/wn/${latestEntry.icon}@2x.png" alt="Weather icon">`
    document.getElementById("date").innerHTML = `Date: ${latestEntry.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${latestEntry.temperature}\xB0${degreeSystem}`;
    document.getElementById("content").innerHTML = `Feelings: ${latestEntry.feelings}`;
    document.getElementById("journal").classList.remove("hide");
}

// Calculate the user"s date and time
// returns date and time in string
function dateTime() {
    const today = new Date();
    const depart = new Date(date)
    
    const countdown = Math.round((depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return countdown;
}

export { clickRespond }
const API_KEY = "kamara.moses"

const WEATHER_KEY = "94ec406ab85043f285fb0c27f57574a9"

const PIXA_KEY = "19853981-85155ca595da994be43f034e6"

/* Global Variables */

// The URL root if user searches by city
const API_ROOT_CITY = "http://api.geonames.org/searchJSON?q=";

const API_ROOT_PARAMS = "&maxRows=1&username="

const API_ROOT_WEATHER = "https://api.weatherbit.io/v2.0/forecast/daily?"

const API_WEATHER_PARAMS = "&lat=38.123&lon=-78.543&key="

const API_ROOT_PIXA = "https://pixabay.com/api/?key="

const API_PIXA_CITY = "&q="

const API_PIXA_PARAMS = "&image_type=photo"



// The URL for units parameter
const API_UNITS = "&units=";

// Find the Generate button and add the listener
const goButton = document.getElementById("generate");
goButton.addEventListener("click", clickRespond);

// Main function of the program
// Grabs the user"s input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {

   // Grab user"s input
    const cityInput = document.getElementById("city");
    const startDate = document.getElementById("depart");
    const endDate = document.getElementById("return")
    let units;
    let degreeSystem;
    if (units == "metric") {
        degreeSystem = "C";
    } else {
        degreeSystem = "F";
    }

    // Read values of zip and city
    const city = cityInput.value;


    // Form URL based on zip or city search
    // (zip takes precendence if both were entered)
    let url;
    if (city) {
    //     url = API_ROOT_CITY + city + API_ROOT_PARAMS + API_KEY
    // } else {
        url = API_ROOT_WEATHER + city + API_WEATHER_PARAMS + WEATHER_KEY
    // }  {
    //     url = API_ROOT_PIXA + PIXA_KEY + API_PIXA_CITY + API_PIXA_PARAMS;
    // }
    }

    // Call the API
    getWeather(url)

        // Prepares data for POST, calls the POST
        .then(function (weatherData) {
            console.log(weatherData)
            const errorMessage = document.getElementById("error");
            if (weatherData.cod == "200") {
                errorMessage.classList.add("hide");
                const icon = weatherData.weather[0].icon;
                const date = dateTime(startDate, endDate);
                const temperature = weatherData.main.temp.toFixed(0);
                postJournal("/add", { icon, date, temperature });

                // Calls to update the site with latest entry
                updateUI(degreeSystem);

            } else {
                console.log("Bad data entered");
                errorMessage.classList.remove("hide");
                return;
            }
        })
}

// Calls the API, converts response to JSON
// returns weatherData JSON object
async function getWeather(url) {
    const response = await fetch(url);
    const weatherData = await response.json();
    return weatherData;
}

// POSTs the journal data (icon, date/time, temperature, feelings)
async function postJournal(url, data) {
    await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: { 
            "Content-Type": "application/json" 
        },
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
    const d = new Date();
    let minutes = d.getMinutes();
    if (d.getMinutes() <= 9) {
        minutes = `0${minutes}`;
    }
    const date = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} at time ${d.getHours()}:${minutes}`;
    return date;
    // const today = new Date();
    // const depart = new Date(startDate);
    // const returnDate = new Date(endDate);
    // let isSoon = false;

    // const countdown = Math.round((depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)); 
    // const duration = Math.ceil((returnDate.getTime() - depart.getTime()) / (1000 * 60 * 60 * 24));

    // if(countdown < 16) {
    //     isSoon = true;
    // }
    // return { depart: startDate, duration: duration, countdown: countdown + 1, isSoon: isSoon};
}



export { clickRespond, getWeather, postJournal, updateUI, dateTime }
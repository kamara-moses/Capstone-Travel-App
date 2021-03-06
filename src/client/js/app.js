/* Global Variables */

// The URL root if user searches by city
const API_ROOT_CITY = 'http://api.geonames.org/searchJSON?q=';

const API_ROOT_PARAMS = "&maxRows=1&username="

// The URL for api key parameter
const API_KEY = `kamara.moses`;

// Find the Generate button and add the listener
const goButton = document.getElementById('generate');
goButton.addEventListener('click', clickRespond);

// Main function of the program
// Grabs the user's input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {

   // Grab user's input
    const cityInput = document.getElementById('city');

    let degreeSystem;
   

    // Read values of zip and city
    const city = cityInput.value;

    // Form URL based on zip or city search
    // (zip takes precendence if both were entered)
    let url;
    if (city) {
        url = API_ROOT_CITY + city + API_ROOT_PARAMS + API_KEY;
    }

    // Call the API
    getWeather(url)

        // Prepares data for POST, calls the POST
        .then(function (geoNames) {
            console.log(geoNames)
            const errorMessage = document.getElementById('error');
            if (geoNames.cod == "200") {
                errorMessage.classList.add('hide');
                const city = geoNames.geonames[0].city;
                const countryName = geoNames.geonames[0].countryName;
                const lat = geoNames.geonames[0].lat;
                const lng = geoNames.geonames[0].lng;
                const date = dateTime();
                postJournal('/add', { city, countryName, lat, lng, date });

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
async function getWeather(url) {
    const response = await fetch(url);
    const geoNames = await response.json();
    return geoNames;
}

// POSTs the journal data (icon, date/time, temperature, feelings)
async function postJournal(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data)
    });
}


// Updates the website's latest entry card
// Includes weather icon, date, temperature, feelings
// Shows the card if it's hidden
async function updateUI(degreeSystem) {
    const response = await fetch('/retrieve');
    const latestEntry = await response.json();
    document.getElementById('icon').innerHTML = `<img class="icon" src="http://openweathermap.org/img/wn/${latestEntry.icon}@2x.png" alt="Weather icon">`
    document.getElementById('date').innerHTML = `Date: ${latestEntry.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${latestEntry.temperature}\xB0${degreeSystem}`;
    document.getElementById('content').innerHTML = `Feelings: ${latestEntry.feelings}`;
    document.getElementById('journal').classList.remove('hide');
}

// Calculate the user's date and time
// returns date and time in string
function dateTime() {
    const d = new Date();
    let minutes = d.getMinutes();
    if (d.getMinutes() <= 9) {
        minutes = `0${minutes}`;
    }
    const date = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} at time ${d.getHours()}:${minutes}`;
    return date;
}

export { clickRespond }
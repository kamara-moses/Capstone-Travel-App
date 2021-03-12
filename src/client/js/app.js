/* Global Variables */

// The URL root if user searches by city
const API_ROOT_CITY = "http://api.geonames.org/searchJSON?q=";

// Parameters for geonames
const API_ROOT_PARAMS = "&maxRows=1";

// API KEY for geonames
const API_KEY = `&username=kamara.moses`;

// WeatherBit URL
const API_ROOT_BIT = "https://api.weatherbit.io/v2.0/forecast/daily?";

// Parameters for weatherbit
const API_BIT_PARAMS = "&city=";

// API KEY for weatherbit
const API_BIT_KEY = "&key=cda6df51d9a24b8c9d54b830f4eadb51";

// PixaBay URL
const API_ROOT_PIXA = "https://pixabay.com/api/?";

// API KEY for pixabay
const API_PIXA_KEY = "key=19853981-85155ca595da994be43f034e6";

// Parameters for pixabay
const API_PIXA_PARAMS = "&q=";

// Type of image from pixabay
const API_PIXA_IMAGE = "&image_type=photo";

// Main function of the program
// Grabs the user"s input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {
  // Grab user"s input
  const cityInput = document.getElementById("city");

  // Read values of zip and city
  const city = cityInput.value;

  // Form URL based on zip or city search
  // (zip takes precendence if both were entered)
  let url;
  let bitURL;
  let pixaURL;

  if (city) {
    url = API_ROOT_CITY + city + API_ROOT_PARAMS + API_KEY;
    bitURL = API_ROOT_BIT + API_BIT_PARAMS + city + API_BIT_KEY;
    pixaURL = API_ROOT_PIXA + API_PIXA_KEY + API_PIXA_PARAMS + API_PIXA_IMAGE;
  }

  // Calls the API
  getGeo(url)
    // Prepares data for POST, calls the POST
    .then(function (response) {
      // CHANGE: call it response
      const errorMessage = document.getElementById("error");
      if (response.status == "200") {
        // CHANGE: check the status
        errorMessage.classList.add("hide");
        const city = response.geoNames.geonames[0].name; // Change

        postJournal("/add", { city });
        // Calls to update the site with latest entry
        updateUI();
      } else {
        console.log("Bad data entered");
        errorMessage.classList.remove("hide");
        return;
      }
    });

  // Calls the API
  getWeather(bitURL).then(function (response) {
    const errorMessage = document.getElementById("error");
    if (response.status == "200") {
      errorMessage.classList.add("hide");
      const icon = response.weatherBit.data[0].weather.icon;
      const description = response.weatherBit.data[0].weather.description;
      const newDate = dateTime();
      const date = newDate;
      const highTemp = response.weatherBit.data[0].high_temp;
      const lowTemp = response.weatherBit.data[0].low_temp;
      postJournal("/add", {
        icon: icon,
        description: description,
        date: date,
        highTemp: highTemp,
        lowTemp: lowTemp,
      });

      // Calls to update the site with latest entry
      updateUI();
    } else {
      console.log("Bad data entered");
      errorMessage.classList.remove("hide");
      return;
    }
  });
  // Calls the API
  getPix(pixaURL).then(function (response) {
    console.log(response);
    const errorMessage = document.getElementById("error");
    if (response.status == "200") {
      errorMessage.classList.add("hide");
      const image = response.pixaBay.hits[0].webformatURL;

      postJournal("/add", { image: image });

      // Calls to update the site with latest entry
      updateUI();
    } else {
      console.log("Bad data entered");
      errorMessage.classList.remove("hide");
      return;
    }
  });
}

// Calls the API, converts response to JSON
// returns geoNames JSON object
async function getGeo(url) {
  const response = await fetch(url);
  const status = response.status; // CHANGE: get API call status
  const geoNames = await response.json();
  return { geoNames, status }; // CHANGE: send it along with the data
}

// Calls the API, converts response to JSON
// returns weatherBit JSON object
async function getWeather(bitURL) {
  const response = await fetch(bitURL);
  const status = response.status;
  const weatherBit = await response.json();
  return { weatherBit, status };
}

// Calls the API, converts response to JSON
// returns pixaBay JSON object
async function getPix(pixaURL) {
  const response = await fetch(pixaURL);
  const status = response.status;
  const pixaBay = await response.json();
  return { pixaBay, status };
}

// POSTs the journal data (icon, date/time, temperature )
async function postJournal(url, data) {
  await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });
  console.log(data);
}

// Updates the website"s latest entry card
// Includes weather icon, date, temperature, feelings
// Shows the card if it"s hidden
async function updateUI() {
  const response = await fetch("/retrieve");
  console.log(response);
  const latestEntry = await response.json();
  console.log(latestEntry);
  document.getElementById(
    "name"
  ).innerHTML = `Destination City: ${latestEntry.city}`;
  document.getElementById(
    "image"
  ).innerHTML = `<img src="${latestEntry.image}">`;
  document.getElementById(
    "icon"
  ).innerHTML = `<img src="${latestEntry.icon}" alt="Weather Icons">`;
  document.getElementById(
    "date"
  ).innerHTML = `Your trips is in: ${latestEntry.date} days`;
  document.getElementById(
    "description"
  ).innerHTML = `Typical weather is: ${latestEntry.description}`;
  document.getElementById(
    "highTemp"
  ).innerHTML = `High Temp: ${latestEntry.highTemp}\xB0`;
  document.getElementById(
    "lowTemp"
  ).innerHTML = `Low Temp: ${latestEntry.lowTemp}\xB0`;
  document.getElementById("journal").classList.remove("hide");
}

// Calculate the user"s date and time
// returns date and time in string
function dateTime() {
  const dateInput = document.getElementById("depart");
  const date = dateInput.value;

  const today = new Date();
  const depart = new Date(date);

  const countdown = Math.round(
    (depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return countdown;
}

export { clickRespond };

// Function for form submittion
const handleSubmit = async (event) => {
  event.preventDefault();

  // Check the users input
  let cityName = document.getElementById("city").value;

  // Alert user
  if (cityName === "") {
    alert("Please enter city name!!!");
    return;
  }

  console.log("::: Form Submitted :::");

  // Allows fetched data to be accessible anywhere
  let cityLatLon = {};
  let receivedWeatherInJson = {};
  let receivedPicInJson = {};

  console.log("fecthing data from geonames", { city: cityName });

  // Post Method
  const resGeo = await fetch("http://localhost:8081/city", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ city: cityName }),
  });
  try {
    // receive res from the server side and transform into json
    const receivedGeoInJson = await resGeo.json();
    cityLatLon = {
      city: receivedGeoInJson.geonames[0].name,
      country: receivedGeoInJson.geonames[0].countryName,
      lat: receivedGeoInJson.geonames[0].lat,
      lon: receivedGeoInJson.geonames[0].lng,
    };
    console.log("Data received from geonames:", cityLatLon);
  } catch (error) {
    console.log("error", error);
  }
  console.log("Fetching weather data from weatherbit:", { cityLatLon });
  // Post Method
  const resWeather = await fetch("http://localhost:8081/weather", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cityLatLon),
  });
  try {
    // return receivedWeatherInJson;
    receivedWeatherInJson = await resWeather.json();
    console.log("Data received from weatherbit:", receivedWeatherInJson);
  } catch (error) {
    console.log("error", error);
  }

  console.log("Fetching a pic from pixabay:", { cityLatLon });
  // Post Method
  const resPic = await fetch("http://localhost:8081/pic", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cityLatLon),
  });
  try {
    receivedPicInJson = await resPic.json();
    console.log("Data received from pixabay:", receivedPicInJson);

    // return receivedPicInJson;
  } catch (error) {
    console.log("error", error);
  }

  const main = document.querySelector("main");
  const tripData = document.createElement("section");
  tripData.setAttribute("id", "trip");
  tripData.innerHTML = Client.updateUI(
    dates,
    receivedPicInJson,
    cityLatLon,
    receivedWeatherInJson
  );
  main.appendChild(tripData);
};

export { handleSubmit }

// Main function of the program
// Grabs the user"s input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {
  // Grab user"s input
  const cityInput = document.getElementById("city");
  const dateInput = document.getElementById("depart").value;

  const city = cityInput.value;

  const today = new Date();
  const depart = new Date(dateInput);

  const countdown = Math.round(
    (depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (city && depart) {
    const data = {
      city: city,
      depart: countdown,
    };

    getWeather(data).then(async (res) => {
      try {
        const latestEntry = await res.json();
        if (latestEntry) {
          document.getElementById(
            "name"
          ).innerHTML = `Your Destination is: ${city}`;
          document.getElementById("pix").innerHTML = `<img src=${latestEntry.image} height="350px" width="550px" alt="City Image">`;
          document.getElementById(
            "icon"
          ).innerHTML = `<img src="https://www.weatherbit.io/static/img/icons/${latestEntry.icon}.png" alt="Forecast Icons">`;
          document.getElementById(
            "date"
          ).innerHTML = `Your trips is in: ${countdown} days`;
          document.getElementById(
            "description"
          ).innerHTML = `Typical Forecast is: ${latestEntry.description}`;
          document.getElementById(
            "highTemp"
          ).innerHTML = `High Temp: ${latestEntry.highTemp}\xB0`;
          document.getElementById(
            "lowTemp"
          ).innerHTML = `Low Temp: ${latestEntry.lowTemp}\xB0`;
          document.getElementById("journal").classList.remove("hide");
        }
      } catch (error) {
        alert("error occoured! try again.");
      }
    });
  } else {
    console.log("Bad data entered");
    errorMessage.classList.remove("hide");
  }
}

const getWeather = async (data) => {
    return await fetch(`http://localhost:8000/getWeather`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

export { clickRespond };

// Find the Generate button and add the listener
const goButton = document.getElementById("generate");
goButton.addEventListener("click", clickRespond);

// Main function of the program
// Grabs the user"s input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {
  // Grab user"s input
  const city = document.getElementById("city").value;
  const startDate = document.getElementById("depart").value;

  const today = new Date();
  const depart = new Date(startDate);


  const countdown = Math.round(
    (depart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  let date = { countdown };

  if (city && startDate) {
    const data = {
      city: city,
      date: countdown,
    };

    getWeather(data).then(async (res) => {
        try {
            const result = await res.json();
            if (result) {
              document.getElementById('trip-to').innerHTML = location;
              document.getElementById('trip-on').innerHTML = date;
              document.getElementById('day-info').innerHTML = `${daysAhead} ${daysAhead >= 1 ? 'days away!' : 'days behind!'}`;
              document.getElementById('weather').innerHTML = result.summary || 'not provided';
              document.getElementById('high').innerHTML = result.tempHigh || '-';
              document.getElementById('low').innerHTML = result.tempLow || '-';
              document.getElementById('trip-img').src = result.img || '-';
  
            }
      } catch (error) {
        alert("error occoured! try again.");
      }
    });
  } else {
    alert("please enter valid information");
  }
  console.log("::: Form Submitted :::")
}

const getWeather = async (data) => {
    return await fetch(`http://localhost:8081/getWeather`, {
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

export { clickRespond, getWeather }
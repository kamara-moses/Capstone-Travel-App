

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
      console.log("::: Form Submitted :::");

      postData("http://localhost:8081/getWeather", { city, startDate }).then(function (
        res
      ) {
        //Clear UI
        const results = document.getElementById("results");
        results.innerHTML = "";
        results.style.display = "block";
  
        let resultsHTML;
        if (results) {
          resultsHTML = `
                    <div>
                    <h1>Your trip to: ${res.city}</h1>
                    <span><img src=${res.img}</span>
                    <p><span>Weather: ${res.description}</span></p>
                    <p><span>High TemP: ${res.tempHigh}%</span></p>
                    <p><span>Low Temp: ${res.tempLow}</span></p>
                    </div>`;
        }
        //add resultsHTML to DOM
        results.insertAdjacentHTML("beforeend", resultsHTML);
      });
    } else {
      alert("Please check the city input and dates!");
    }
}

// const getWeather = async (data) => {
//     return await fetch(`http://localhost:8081/getWeather`, {
//       method: 'POST',
//       mode: 'cors',
//       credentials: 'same-origin',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//   }

  const postData = async (city = "", data = {}) => {
    console.log(data);
    const response = await fetch(city, {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = await response.json();
      console.log("Data received:", newData);
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};

export { clickRespond, postData}
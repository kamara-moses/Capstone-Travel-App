// Find the Generate button and add the listener
const goButton = document.getElementById("generate");
goButton.addEventListener("click", clickRespond);

// Main function of the program
// Grabs the user"s input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {
  // Grab user"s input
  const city = document.getElementById("city").value;

  if (city) {
    const data = {
      city: city
    };

    getWeather(data);
  
    console.log("::: Form Submitted :::");
  }
}

export { clickRespond, getWeather };

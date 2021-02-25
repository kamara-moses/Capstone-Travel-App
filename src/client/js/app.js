// Main function of the program
// Grabs the user's input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {

    // Read values of city
    const city = document.getElementById("city").value;
    console.log(city)

    if (city === "") {
        alert("Please enter a city name")
    }
    console.log("::: Form Submitted :::")
}

export { clickRespond } 
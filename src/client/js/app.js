// Main function of the program
// Grabs the user's input, then forms URL, calls API, POSTS and updates UI
function clickRespond() {

    // Read values of city
    const city = document.getElementById("city").value;

    console.log("::: Form Submitted :::")

    postData("http://localhost:8000/geoName", {city: city})

    .then(function(res) {
        document.getElementById("results").innerHTML = `GeoData: ${res.geoData}`
    })
}


const postData = async(city = "", data = {}) => {
    console.log("GeoData:", data);
    const response = await fetch(city, {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const nameData = await response.json();
        console.log("Data received:", nameData)
        return nameData;
    } catch (error) {
        console.log("error", error)
    }
}
export { clickRespond } 
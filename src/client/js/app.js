// Main function of the program
// Grabs the user's input, then forms URL, calls API, POSTS and updates UI
async function clickRespond() {

    // Read values of city
    const city = document.getElementById("city").value;

    console.log("::: Form Submitted :::")

    // get data from GeoNames
    const location = await postData('/geoName', { destination: city})

    // Get data from WeatherBit
    const weather = await postData('/weatherBit', { lat: location.lat, long: location.long });


}


async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}


export { clickRespond, postData } 
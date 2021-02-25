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

    // Get forecast for the trip
    let forecast = 0;


    const getData = {
        city: weather.city_name,
        high_temp: weather.data[forecast].high_temp,
        low_temp: weather.data[forecast].low_temp,
        forecast: weather.data[forecast].weather.description
    }
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
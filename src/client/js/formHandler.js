const handleSubmit = async (event) => {

    event.preventDefault();
    // check users input
    let cityName = document.getElementById("city").value

        // calculate departure days
        // ref: https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
        // ref: https://www.w3resource.com/javascript/object-property-method/date.php
        let startDate = document.getElementById("start").value
        let endDate = document.getElementById("end").value
        let today = new Date()
        let tripStart = new Date(startDate)
        let tripEnd = new Date(endDate)
        let diffInTime = tripStart.getTime() - today.getTime()
        // rounded up to the nearest integer (ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)
        let diffInDays = Math.round(diffInTime / (1000*3600*24))
        // put dates in object to be accessible from everywhere
        let dates = {startDate, endDate, diffInDays}

        // alert if a user submit without entering values
        if(cityName === "") {
            alert("Please enter a city name.")
            return
        }

        // check if a user enter a valid date
        if(tripStart < today || tripEnd < tripStart) {
            alert("Invalid date: either you select past date as start date or set end date earlier than start date.")
            return
        }

        console.log("::: Form Submitted :::")

        // Makes fetched data accessible from everywhere
        let cityLatLon = {}
        let receivedWeatherInJson = {}
        let receivedPicInJson = {}

        console.log("Fetching data from geonames:", { city: cityName });

        // Post Method
        const resGeo = await fetch("http://localhost:8081/city", {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({city: cityName})
        });
        try {
            //  Transforms received data from the server into json
            const receivedGeoInJson = await resGeo.json(); 
            cityLatLon = {
                city: receivedGeoInJson.geonames[0].name,
                country: receivedGeoInJson.geonames[0].countryName,
                lat: receivedGeoInJson.geonames[0].lat,
                lon: receivedGeoInJson.geonames[0].lng
            }
            console.log("Data received from geonames:", cityLatLon)
            // return cityLatLon and end implementation
        } catch (error) {
            console.log("error", error);
        }

        console.log("Fetching data from weatherbit:", {cityLatLon});

        // Post Method
        const resWeather = await fetch("http://localhost:8081/weather", {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(cityLatLon)
        });
        try {
            receivedWeatherInJson = await resWeather.json();
            console.log("Data received from weatherbit:", receivedWeatherInJson)

            // return receivedWeatherInJson;
        } catch (error) {
            console.log("error", error);
        }

        console.log("Fetching a pic from pixabay:", {cityLatLon});

        // Post Method
        const resPic = await fetch("http://localhost:8081/pic", {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(cityLatLon)
        });
        try {
            receivedPicInJson = await resPic.json();
            console.log("Data received from pixabay:", receivedPicInJson)

            // return receivedPicInJson;
        } catch (error) {
            console.log("error", error);
        }

        const main = document.querySelector("main")
        const tripData = document.createElement("section")
        tripData.setAttribute("class", "card")
        tripData.innerHTML = Client.updateUI(dates, receivedPicInJson, cityLatLon, receivedWeatherInJson);
        main.appendChild(tripData)

}

export { handleSubmit }
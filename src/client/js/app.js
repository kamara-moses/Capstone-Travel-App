// Main function of the program
// Grabs the user's input, then forms URL, calls API, POSTS and updates UI
async function clickRespond() {

    // Read values of city
    const city = document.getElementById("city").value;

    console.log("::: Form Submitted :::")

    /* Get data from Geonames */
    const location = await postData('/geoName', { location: city})

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
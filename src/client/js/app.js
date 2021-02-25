// Main function of the program
// Grabs the user's input, then forms URL, calls API, POSTS and updates UI
async function clickRespond() {

    // Read values of city
    const city = document.getElementById("city").value;

    console.log("::: Form Submitted :::")

    /* Get data from Geonames */
    const location = await postData('/geoName', { location: city})

}



export { clickRespond } 
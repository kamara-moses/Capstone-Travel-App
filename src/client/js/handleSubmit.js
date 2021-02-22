const goButton = document.getElementById("generate");
goButton.addEventListener("click", clickResponse);

function clickResponse() {

    /* Get image from Pixabay */
    const image = getData('/getPhoto');
    projectData.image_url = image.hits[0].largeImageURL;

    console.log("::: Form Submitted :::")
}

export { clickResponse }
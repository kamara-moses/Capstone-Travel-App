// js files
import { clickRespond } from "./js/app"


// sass files
import "./styles/resets.scss"
import "./styles/base.scss"
import "./styles/footer.scss"
import "./styles/header.scss"

// Find the Generate button and add the listener
const goButton = document.getElementById("submit");
goButton.addEventListener("click", clickRespond);

export { clickRespond }
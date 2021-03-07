import { clickRespond } from "./js/app"

import "./styles/style.scss"

// Find the Generate button and add the listener
const goButton = document.getElementById("generate");
goButton.addEventListener("click", clickRespond);

export { clickRespond }
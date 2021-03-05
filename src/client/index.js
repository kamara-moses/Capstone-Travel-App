import { clickRespond } from "./js/app"

import "./styles/main.scss"
import "./styles/footer.scss"
import "./styles/results.scss"

// Find the Generate button and add the listener
const goButton = document.getElementById("generate");
goButton.addEventListener("click", clickRespond);

export { clickRespond }
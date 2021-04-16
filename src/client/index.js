import { handleEvent, calcDaysBetweenDates, updateUI } from "./js/app";

import "./styles/style.scss";
import "./styles/footer.scss";
import "./assets/clouds.png";
import "./assets/travel.png";
import "./assets/github.png";
import "./assets/twitter.png";

const submitButton = document.getElementById("submitFormData");
handleEvent(submitButton);

export { handleEvent, calcDaysBetweenDates, updateUI };

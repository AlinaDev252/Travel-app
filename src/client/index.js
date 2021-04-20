import { handleEvent, calcDaysBetweenDates, updateUI } from "./js/app";

import "./styles/style.scss";
import "./assets/clouds.png";
import "./assets/holiday.png";


const submitButton = document.getElementById("submitFormData");
handleEvent(submitButton);

export { handleEvent, calcDaysBetweenDates, updateUI };

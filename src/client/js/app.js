import axios from "axios";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
console.log(newDate);

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
const handleSubmit = async (e) => {
	e.preventDefault();

	const city = document.getElementById("location").value;
	const departureDate = document.getElementById("date").value;
	console.log("::: Form Submitted :::");
	console.log(city);
	console.log(departureDate);

	return await axios
		.post("/geoNamesAPI", { data: { country, latitude, longitude } })
		.then((res) => updateUI(res.data))
		.catch((error) => console.log("Error", error));
};

// function getWeather(e) {
// 	e.preventDefault();
// 	// const city = document.getElementById("location").value;
// 	// const departureDate = document.getElementById("date").value;
// 	getWeatherDetails(city, departureDate, urlKey)
// 		.then(function (infoData) {
// 			console.log("Checking info received from GeoNames", infoData);

// 			const country = infoData.geonames[0].countryName;
// 			const latitude = infoData.geonames[0].lat;
// 			const longitude = infoData.geonames[0].lng;

// 			// Post weather details to the server
// 			postData("/add", {
// 				country,
// 				latitude,
// 				longitude,
// 			});

// 			//  Call UpdateUI function after click and weather details are gathered
// 		})
// 		.then(() => {
// 			updateUI();
// 		});
// }

/* Function to GET Web API Data*/

// const getWeatherDetails = async (city, departureDate, urlKey) => {
// 	const response = await fetch(city + departureDate + urlKey);
// 	try {
// 		const data = await response.json();
// 		console.log(data);
// 		return data;
// 	} catch (error) {
// 		console.log("error", error);
// 	}
// };

// /* Function to POST data */
// async function postData(url = "", data = {}) {
// 	await fetch(url, {
// 		method: "POST",
// 		credentials: "same-origin",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(data),
// 	});
// }

/* Function to GET Project Data */
// async function updateUI() {
// 	// GET function that takes the info from the server
// 	const response = await fetch("/all");
// 	try {
// 		const lastEntry = await response.json();
// 		console.log(lastEntry);
// 		document.getElementById("country").innerHTML = "Country: " + lastEntry.geonames[0].countryName;
// 		document.getElementById("latitude").innerHTML = "Latitude: " + lastEntry.geonames[0].lat;
// 		document.getElementById("longitude").innerHTML = "Longitude: " + lastEntry.geonames[0].lng;
// 	} catch (error) {
// 		console.log("Error", error);
// 	}
// }

const updateUI = async (response) => {
	document.getElementById("country").innerHTML = "Country: " + response.geonames[0].countryName;
	document.getElementById("latitude").innerHTML = "Latitude: " + response.geonames[0].lat;
	document.getElementById("longitude").innerHTML = "Longitude: " + response.geonames[0].lng;
};

export { handleSubmit, updateUI };

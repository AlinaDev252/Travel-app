/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = "&units=metric&appid=6c31832a1258f53fbea517b9e487dcf8";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", getWeather);

/* Function called by event listener */
function getWeather(e) {
	e.preventDefault();
	const zipCode = document.getElementById("zip").value;
	const userResponse = document.getElementById("feelings").value;
	getWeatherDetails(baseURL, zipCode, apiKey)
		.then(function (weatherInfo) {
			console.log("Checking weather info", weatherInfo);

			const temperature = weatherInfo.main.temp;
			const city = weatherInfo.name;
			const description = weatherInfo.weather[0].description;
			const windSpeed = weatherInfo.wind.speed;
			const humidity = weatherInfo.main.humidity;
			const country = weatherInfo.sys.country;
			const input = userResponse;
			// Post weather details to the server
			postData("/add", {
				temperature,
				city,
				description,
				windSpeed,
				humidity,
				country,
				input,
			});

			//  Call UpdateUI function after click and weather details are gathered
		})
		.then(() => {
			updateUI();
		});
}

/* Function to GET Web API Data*/

const getWeatherDetails = async (baseURL, zipCode, apiKey) => {
	const response = await fetch(baseURL + zipCode + apiKey);
	try {
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

/* Function to POST data */
async function postData(url = "", data = {}) {
	await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
}

/* Function to GET Project Data */
async function updateUI() {
	// GET function that takes the info from the server
	const response = await fetch("/all");
	try {
		const lastEntry = await response.json();
		console.log(lastEntry);
		document.getElementById("city").innerHTML = "City: " + lastEntry.city;
		document.getElementById("country").innerHTML = "Country: " + lastEntry.country;
		document.getElementById("temperature").innerHTML =
			"Current temperature: " + Math.floor(lastEntry.temperature) + "°C";
		document.getElementById("description").innerHTML = "Weather description: " + lastEntry.description;
		document.getElementById("humidity").innerHTML = "Humidity: " + lastEntry.humidity + "%";
		document.getElementById("wind").innerHTML = "Wind speed: " + lastEntry.windSpeed + "km/h";
		document.getElementById("date").innerHTML = "Today's date: " + newDate;
		document.getElementById("content").innerHTML = "Your feelings for today: " + lastEntry.input;
	} catch (error) {
		console.log("Error", error);
	}
}

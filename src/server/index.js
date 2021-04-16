// Express to run server and routes
const express = require("express");

// Fetch for node to fetch API data
const fetch = require("node-fetch");

// Start up an instance of app
const app = express();

// Use path to work with files and directory paths
const path = require("path");

// Dependencies
const bodyParser = require("body-parser");
// Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Error-handling middleware
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Designates what port the app will listen to for incoming requests
const port = 2525;
app.listen(port, function () {
	console.log(`Travel app listening on port: ${port}`);
});

// Add environment variables so that my personal API keys won't be public on Github
const dotenv = require("dotenv");
dotenv.config();

const geonamesUsername = process.env.geonameUser;
const weatherbitApiKey = process.env.weatherbitApiKey;
const pixabayApiKey = process.env.pixabayApiKey;

// Setup empty JS objects to act as endpoints for all routes
let formData = {};
let geoData = {};
let weatherData = {};
let pixabayData = {};

app.post("/sendFormData", async (req, res) => {
	formData = {
		destination: req.body.destination,
		daysBetweenDates: req.body.daysBetweenDates,
	};
	// if the travel date is further away than the 16 days forecast, set it to 15 and show the last forecast
	if (formData.daysBetweenDates > 16) {
		formData.daysBetweenDates = 15;
	}
	await callApi(createGeonamesFetchLink(formData.destination, geonamesUsername));
	res.status(200).send({ msg: "Data received" });
});

// create the fetch links
const createGeonamesFetchLink = (destination) => {
	return `http://api.geonames.org/searchJSON?name=${destination}&maxRows=1&username=${geonamesUsername}`;
};
const createWeatherbitFetchLink = (lat, lng) => {
	return `http://api.weatherbit.io/v2.0/forecast/daily?key=${weatherbitApiKey}&lat=${lat}&lon=${lng}`;
};

const createPixabayFetchLink = (destination) => {
	return `https://pixabay.com/api/?key=${pixabayApiKey}&q=${destination}&image_type=photo&orientation=horizontal&min_width=1920`;
};

// function to fetch data from different apis
const callApi = async (url) => {
	try {
		await fetch(url)
			.then((res) => res.json())
			.then(async (data) => {
				console.log("Data is: ", data);
				// Geonames check
				if ("geonames" in data) {
					geoData = {
						lat: data.geonames[0].lat,
						lng: data.geonames[0].lng,
					};
					await callApi(createWeatherbitFetchLink(geoData.lat, geoData.lng));
					// console.log(geoData); for debugging purpose only
				}
				// Weatherbit check
				if ("city_name" in data) {
					// console.log(data); for debugging purpose only
					weatherData = {
						averageTemp: data.data[0].temp,
						minTemp: data.data[0].min_temp,
						maxTemp: data.data[0].max_temp,
						iconCode: data.data[0].weather.icon,
						tripLength: formData.daysBetweenDates,
					};
					await callApi(createPixabayFetchLink(formData.destination));
				}
				// Pixabay check
				if ("hits" in data) {
					pixabayData = {
						imageUrl: data.hits[0].largeImageURL,
					};
				}
			});
	} catch (err) {
		console.log("Error: " + err);
	}
};

// GET data after the last fetch
app.get("/getData", (req, res) => {
	res.status(200).send([weatherData, pixabayData]);
	console.log("Data was sent!");
});

module.exports = app;

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const axios = require("axios");
// Add environment variables, API for GeoNames
const userName = "alinadev252";
const city = "";
const urlKey = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${userName}`;

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
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

// Setup Server
const port = 2525;

// Spin up the server
const server = app.listen(port, listening);

function listening() {
	console.log(server);
	console.log(`running on localhost: ${port}`);
}

// GET request
app.get("/", function (req, res) {
	res.sendFile("dist/index.html");
});

//POST request
app.post("/geoNamesApi", (req, res) => {
	axios.post(urlKey).then((response) => {
		res.send(response.data);
		console.log(response.data);
	});
});

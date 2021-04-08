var path = require("path");
// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// Callback function to complete GET '/'
app.get("/", function (req, res) {
	res.sendFile(path.resolve("src/client/views/index.html"));
});

// Post Route for GeoNames
app.post("/addLocation", function (req, res) {
	newEntry = {
		cityname: req.body.cityname,
		country: req.body.country,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
	};
	projectData.push(newEntry);
	res.send(projectData);
	console.log(projectData);
});

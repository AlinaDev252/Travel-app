// Setup empty JS object to act as endpoint for all routes
let projectData = {};

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
const path = require("path");
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

// Callback function to complete GET '/all'
app.get("/all", function (request, response) {
	response.send(projectData);
});

app.post("/add", postData);

function postData(request, response) {
	projectData = request.body;
	response.send({ message: "Post received" });
	console.log(request);
}
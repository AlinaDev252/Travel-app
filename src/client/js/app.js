// Global variables
const apiKey = "alinadev252";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", getLocation);

// Function called by event listener
function getLocation() {
	// e.preventDefault();
	const location = document.getElementById("location").value;
	getLocationDetails(location)
		.then(function (locationInfo) {
			console.log("Checking location info", locationInfo);
			// const city = locationInfo.geonames[0].data.cityname;
			const country = locationInfo.geonames[0].country;
			const latitude = locationInfo.geonames[0].latitude;
			const longitude = locationInfo.geonames[0].longitude;

			// Post weather details to the server
			postData("/addLocation", {
				// city,
				country,
				latitude,
				longitude,
			});

			//  Call UpdateUI function after click and location details are gathered
		})
		.then(() => {
			updateUI();
		});
}

// /* Function to GET Web API Data from geonames API*/

const getLocationDetails = async (city) => {
	const baseURL = `http://api.geonames.org/searchJSON?placename=${city}&maxRows=1&username=${apiKey}`;
	const response = await fetch(baseURL);
	try {
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log("error", error);
	}
};

//  Function to POST data
async function postData(url = "", data = {}) {
	await fetch(url, {
		method: "POST",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log("error", error);
	}
}

// Function to update the UI
async function updateUI() {
	// GET function that takes the info from the server
	const response = await fetch("/");
	try {
		const lastEntry = await response.json();
		console.log(lastEntry);
		document.getElementById("country").innerHTML = "Country: " + lastEntry[0].country;
		document.getElementById("latitude").innerHTML = "Latitude: " + lastEntry[0].latitude;
		document.getElementById("longitude").innerHTML = "Longitude: " + lastEntry[0].longitude;
	} catch (error) {
		console.log("Error", error);
	}
}

export { getLocation, getLocationDetails, updateUI };

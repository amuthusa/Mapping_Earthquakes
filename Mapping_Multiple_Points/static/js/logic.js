//just log basic information
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([34.0522, -118.2437], 14);
let map = L.map('mapid').setView([37.0902, -95.7129], 4);
//let map = L.map('mapid').setView([37.568832, -122.0475119], 20);

//creating a tile layer which will be set as a background for our map
// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: MAP_API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//get cities data from cities.js
let cityData = cities;

//iterate over cities
cityData.forEach(function (city) {
    //add a marker to the map for each location for the city it refers to
    L.circleMarker(city.location, {
        radius: (city.population-200000) / 100000,
        color: "orange",
        weight: 4
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3> Population: "+ city.population.toLocaleString() + "</h3>")
    .addTo(map);
});
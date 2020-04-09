//just log basic information
console.log("working");

// Create the map object with a center and zoom level.
//let map = L.map('mapid').setView([34.0522, -118.2437], 14);
let map = L.map('mapid').setView([37.6213, -122.3790], 5);

//creating a tile layer which will be set as a background for our map
// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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

//add points for LAX airport to SFO airport
let coordinates = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
];

//create a polyline using coordinates
L.polyline(coordinates, {
    color: "yellow"
}).addTo(map);

//From SFO to JFK via AUS and YYZ
coordinates = [
    [37.6213, -122.3790],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.7781]
];

L.polyline(coordinates, {
    color: "blue"
}).addTo(map);
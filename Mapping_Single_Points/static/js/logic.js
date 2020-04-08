//just log basic information
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

//creating a tile layer which will be set as a background for our map
// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: MAP_API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//add a marker to the map for Los Angeles, California
//var marker = L.marker([34.0522, -118.2437]).addTo(map);


//add a circular marker to the map for Los Angeles, California
L.circleMarker([34.0522, -118.2437],{
    radius: 300,
    color: "black",
    fillColor: '#ffffa1'
}).addTo(map)

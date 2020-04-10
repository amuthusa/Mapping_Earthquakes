//just log basic information
console.log("working");


//creating a tile layer which will be set as a background for our map
// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: MAP_API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: MAP_API_KEY
});

//create a array of layers as baseMaps
let baseMaps = {
    Streets: streets,
    Dark: dark
}

// Create the map object with a center and zoom level as 2.
let map = L.map('mapid').setView([40.7, -94.5], 4);

//pass our baseMaps to layers and add it to map
L.control.layers(baseMaps).addTo(map);

streets.addTo(map);
//url for airport geojson
let airportDataUrl = "https://raw.githubusercontent.com/amuthusa/Mapping_Earthquakes/master/majorAirports.json";

//grapping the geojson from the url defined using d3
d3.json(airportDataUrl).then(function(data){
    console.log(data);
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2> Airport code: "+ feature.properties.faa + "</h2> <hr>"+
            "Airport name:"+ feature.properties.name);
        }
    }).addTo(map);
});
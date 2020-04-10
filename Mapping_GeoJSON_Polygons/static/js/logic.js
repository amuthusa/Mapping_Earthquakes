//just log basic information
console.log("working");


//creating a tile layer which will be set as a background for our map
// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: MAP_API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: MAP_API_KEY
});

//create a array of layers as baseMaps
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
}

// Create the map object with a center and zoom level as 11.
let map = L.map('mapid', {
    center: [43.7, -79.3], 
    zoom: 11,
    layers: [streets]
});

//pass our baseMaps to layers and add it to map
L.control.layers(baseMaps).addTo(map);

//url for toronto neighborhoods geojson
let torontoHoods = "https://raw.githubusercontent.com/amuthusa/Mapping_Earthquakes/master/torontoNeighborhoods.json";

//add custom style for the linestring
let customStyle = {
    color: "#0000FF",
    weight: 1,
    fillColor: "#ffffa1" 
};

//grapping the geojson from the url defined using d3
d3.json(torontoHoods).then(function(data){
    console.log(data);
    L.geoJSON(data, {
        style: customStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h4> Neighborhood: "+ feature.properties.AREA_NAME +"</h4>");
        }
    }).addTo(map);
});
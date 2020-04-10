//just log basic information
console.log("working");


//creating a tile layer which will be set as a background for our map
// https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    "Day Navigation": light,
    "Night Navigation": dark
}

// Create the map object with a center and zoom level as 2.
let map = L.map('mapid').setView([44.0, -80.0], 2);

//pass our baseMaps to layers and add it to map
L.control.layers(baseMaps).addTo(map);

light.addTo(map);
//url for toronto routes geojson
let airportDataUrl = "https://raw.githubusercontent.com/amuthusa/Mapping_Earthquakes/master/torontoRoutes.json";

//add custom style for the linestring
let customStyle = {
    color: "#ffffa1",
    weight: 2 
};

//grapping the geojson from the url defined using d3
d3.json(airportDataUrl).then(function(data){
    console.log(data);
    L.geoJSON(data, {
        style: customStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Airline: "+ feature.properties.airline +"</h3><hr> Destination: "+feature.properties.dst);
        }
    }).addTo(map,);
});
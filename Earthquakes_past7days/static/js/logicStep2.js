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
    center: [39.5, -98.5], 
    zoom: 3,
    layers: [streets]
});

//pass our baseMaps to layers and add it to map
L.control.layers(baseMaps).addTo(map);

//USGS past7days earthquake geojson data is fetched from below url
let earthquake_past7days_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//using d3 grab the geojson from the USGS url
d3.json(earthquake_past7days_url).then(data => {
    //add the geoJSON layer to the map
    L.geoJSON(data, {

        //convert each feature into a circleMarker on the map
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        //add custom styling for marker using earthquakeStyle function
        style: earthquakeStyle
    }).addTo(map);
});

/**
 * function to style earthquake marker as circle and fill color
 * @param {*} feature 
 */
function earthquakeStyle(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
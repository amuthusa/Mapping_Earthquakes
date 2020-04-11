//create earthquake layer for our map
let earthquakes = new L.layerGroup();

//create tectonic plate layer for our map
let tectonicPlates = new L.layerGroup();

//define an object that contains overlays
let overlays = {
    Earthquakes: earthquakes,
    "Tectonic Plates": tectonicPlates
};

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

let satellite9 = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: MAP_API_KEY
});

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
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Satellite9": satellite9,
    "Day Time": light,
    "Night Time": dark
}

// Create the map object with a center and zoom level as 11.
let map = L.map('mapid', {
    center: [39.5, -98.5], 
    zoom: 3,
    layers: [streets]
});

//pass our baseMaps to layers and add it to map also add the overlays
L.control.layers(baseMaps, overlays).addTo(map);

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
        style: earthquakeStyle,
        //add popup to the marker
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " +feature.properties.mag +"<br> Location : "+ feature.properties.place);
        }
    }).addTo(earthquakes);

    //adding legend to the map
    //create a legend control object
    var legend = L.control({
        position: 'bottomright'
    });

    //add all the details for the legend
    legend.onAdd = function () {    
        let div = L.DomUtil.create('div', 'info legend');
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
        ];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? '-' + magnitudes[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(map);
    //add earthquakes overlay to map for default selection when the page is loaded
    earthquakes.addTo(map);
});

/**
 * function to style earthquake marker as circle and fill color
 * @param {*} feature 
 */
function earthquakeStyle(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
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

function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    } else if (magnitude > 4) {
        return "#ea822c";
    } else if (magnitude > 3) {
        return "#ee9c00";
    } else if (magnitude > 2) {
        return "#eecc00";
    } else if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}

//adding tectonic plate to the map
let tectonicPlateUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
//load the geojson
d3.json(tectonicPlateUrl).then(data => {

    L.geoJSON(data,{
        style: {
            color: "red",
            weight: 2
        },
        //add popup to the marker
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Tectonic Plate Name: " +feature.properties.Name);
        }
    }).addTo(tectonicPlates);

    //add Tectonic paltes to the map by default
    tectonicPlates.addTo(map);
});
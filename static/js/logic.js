// MAPS needed for our diverse backgrounds - tile layers:

// OUTDOORS TYPE MAP
var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
  accessToken: API_KEY
});

// GRAYMAP TYPE
var graymap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
  accessToken: API_KEY
});

//  SATELLITE TYPE MAP
var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
  accessToken: API_KEY
});



// Define a map object with center, zoom and layers
var map = L.map("mapid", {
  // USA center location
  center: [37.09, -95.71],
  zoom: 4,
  layers: [outdoors, graymap, satellitemap]
});


// Define variables needed for layers of tectonicplates and earthquakes.
var tectonicplates = new L.LayerGroup();
var earthquakes = new L.LayerGroup();

// Layers containing different map options
var baseMaps = {
  "Satellite map": satellitemap,
  "Grayscale map": graymap,
  "Normal physical map": outdoors
};

// overlays for data of earthquakes & tectonicplates
var overlayMaps = {
  "Tectonic Plates": tectonicplates,
  "Earthquakes": earthquakes
};

// Adding control layers to map.
L.control
  .layers(baseMaps, overlayMaps, {collapsed: true})
  .addTo(map);

// Extract earthquake geoJSON data.
// decided to retrieve all earthquake data for last week among different options
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
    // console.log(data.features);

  // function to give outlook for markers
  function styleInfo(feature) {
    return {
      fillOpacity: 0.8,
      // Color will be determined by "depth" or 3rd data in coordinates so #2 index as requested
      fillColor: getColor(feature.geometry.coordinates[2]),
      // border of markers/bubbles
      color: "black",
      // Radius will be determined by richter scale magnitude of earthquake
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // Color of the marker depending on magnitude of the earthquake.
  // Depth measured in kilometers according to GeoJSON documentation
  function getColor(depth) {
    switch (true) {
      case depth > 500:
        return "#42117D";
      case depth > 250:
        return "#720DBA";
      case depth > 100:
        return "#942FDC";
      case depth > 20:
        return "#D31BA4";
      case depth > 10:
        return "#D64DB3";
      // just a heads up. Depth can be negative if earthquake happens 
      // in an elevation above sea level (mountain, vulcano, etc)
      default:
        return "#F99BE1";
    }
  }

  // Establish final radius of the earthquake marker 
  // based on its magnitude adjusted or weighted to have better visibility
  function getRadius(magnitude) {
    return magnitude * 3;
  }

  // add GeoJSON layer to the map
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      // Popup text
      layer.bindPopup("<strong>Magnitude (Richter): </strong>" + feature.properties.mag 
      + "<br><strong>Location: </strong>" + feature.properties.place 
      // obtained 3rd coordinate or depth in addition to lat lng
      + "<br><strong>Depth (km): </strong>" + feature.geometry.coordinates[2]);
    }

  }).addTo(earthquakes);

  earthquakes.addTo(map);

  // Position of legend in the map
  var legend = L.control({
    position: "bottomleft"
  });


// Adding legend colors, title, etc
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  //title of labels box, bold and give one additional row space
  labels = ['<strong>EARTHQUAKE DEPTH in KM.</strong><br>'];

  var depths = ['Elevation (depth < 0) ', 10, 20, 100, 250, 500];
  var colors = [
    "#F99BE1",
    "#D64DB3",
    "#D31BA4",
    "#942FDC",
    "#720DBA",
    "#42117D"
  ];
  // Send label to box title
  labels.push('<title></title>');
  div.innerHTML = labels.join('<br>');

 // Loop and to build legend, add classes and div to send to html and map
  for (var i = 0; i < depths.length; i++) {
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
      depths[i] + (depths[i + 1] ? " to " + depths[i + 1] + " km.<br>" : "+ km.");
  }
  return div;
};
legend.addTo(map);

  // Extract data of Tectonic Plates from geoJSON.
  // Simple, free access GeoJSON without API KEY
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json",
    function(platedata) {
      // console.log(platedata.features);
      // Add tectonic plates lines to map
      L.geoJson(platedata, {
        color: "brown",
        dashArray: '4, 4', dashOffset: '0',
        opacity: "0.75",
        weight: 3
      })
      .addTo(tectonicplates);
      // add the tectonicplates layer to the map.
      tectonicplates.addTo(map);
    });
});
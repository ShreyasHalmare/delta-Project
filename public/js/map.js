// const { coordinates } = require("@maptiler/client");

// const { coordinates } = require("@maptiler/client");

// const { coordinates } = require("@maptiler/client");

maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
    container: 'map', // The ID of the HTML element where the map will be displayed
    style: maptilersdk.MapStyle.STREETS, // The "streets" map style
    center: coordinates, // Starting longitude and latitude (lng, lat
    zoom: 10 // Starting zoom level
});

  
console.log(coordinates);

const marker = new maptilersdk.Marker({color: "red"})
    .setLngLat(coordinates)  //Listing.geometry.coordinates
    .setPopup(new maptilersdk.Popup({offset: 25})
    .setHTML("<h4>Location</h4><p>Exact Location will be provided after booking</p>")
    )
    .addTo(map);
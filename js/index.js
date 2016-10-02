/*var map = L.map('mapid').setView([51.505,-122.490113], 8);

var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'luujfer.1hn8ica3',
    accessToken: 'pk.eyJ1IjoibHV1amZlciIsImEiOiJjaXRybDZ5aGQwM3F4MnpvYjAyNjkwa2g5In0.ldAylypFz6krWMbkt2Jw-g'
}).addTo(map); */

var cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
    cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {attribution: cloudmadeAttribution});

var map = new L.Map('mapid').addLayer(cloudmade).setView(new L.LatLng(48.5, 2.5), 15);

var bingGeocoder = new L.Control.BingGeocoder('Aht8b2dNJ5rtqYl_-Jj1l6WU1b2zLRRXu_Apz--2R6Ahj8-PQ14t5u6IkOvmBVrq');

map.addControl(bingGeocoder);


map.locate({setView:true}); 


var currentLoc = L.icon({
  iconUrl: 'currentlocation.png',
  shadowUrl: 'marker-shadow.png',

  iconSize:    [40, 40],
  shadowSize:  [20, 20],
  iconAnchor:  [20, 40],
  shadowAnchor:[1 , 20],
  popupAnchor: [-3, -76]
});

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	L.circle(e.latlng, radius).addTo(map); //add an initial circle to the current location of the user
	currLocation = e;
	//L.marker(e.latLng, {icon: currentLoc}).addTo(map);
	L.marker((e.latlng), {icon: currentLoc}).addTo(map);
}

map.on('locationfound', onLocationFound); //locates the user's location on start up

function onLocationError(e) { //any errors that occur with getting the user's location
	alert(e.message);
}

map.on('locationerror', onLocationError);


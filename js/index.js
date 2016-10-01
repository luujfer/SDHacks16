var map = L.map('mapid').setView([51.505,-122.490113], 8);

var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'luujfer.1hn8ica3',
    accessToken: 'pk.eyJ1IjoibHV1amZlciIsImEiOiJjaXRybDZ5aGQwM3F4MnpvYjAyNjkwa2g5In0.ldAylypFz6krWMbkt2Jw-g'
}).addTo(map);


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


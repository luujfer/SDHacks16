var map = L.map('mapid').setView([51.505,-122.490113], 8);

var mapbox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'luujfer.1hn8ica3',
    accessToken: 'pk.eyJ1IjoibHV1amZlciIsImEiOiJjaXRybDZ5aGQwM3F4MnpvYjAyNjkwa2g5In0.ldAylypFz6krWMbkt2Jw-g'
}).addTo(map);

var GoogleSearch = L.Control.extend({
      onAdd: function() {
        var element = document.createElement("input");

        element.id = "searchBox";

        return element;
      }
    });

    (new GoogleSearch).addTo(map);

    var input = document.getElementById("searchBox");

    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      var group = L.featureGroup();

      places.forEach(function(place) {

        // Create a marker for each place.
        console.log(places);
        console.log(place.geometry.location.lat() + " / " + place.geometry.location.lng());
        var marker = L.marker([
          place.geometry.location.lat(),
          place.geometry.location.lng()
        ]);
        group.addLayer(marker);
      });

      group.addTo(map);
      map.fitBounds(group.getBounds());
});

map.locate({setView:true}); 

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	L.circle(e.latlng, radius).addTo(map); //add an initial circle to the current location of the user
	currLocation = e;
}

map.on('locationfound', onLocationFound); //locates the user's location on start up

function onLocationError(e) { //any errors that occur with getting the user's location
	alert(e.message);
}

map.on('locationerror', onLocationError);


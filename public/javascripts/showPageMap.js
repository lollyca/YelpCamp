// #1 - Map
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 8, // starting zoom
});

// #2 - Marker
const marker1 = new mapboxgl.Marker()
.setLngLat([-74.5, 40])
.addTo(map);


/* Documentation:

#1
https://docs.mapbox.com/mapbox-gl-js/guides/install/?q=marker&size=n_10_n
P.S.: mapToken is the name of the variable in the show page, its a reference

#2
//https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/


*/
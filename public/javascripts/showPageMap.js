mapboxgl.accessToken = mapToken; //mapToken is the name of the variable in the show page, its a reference
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 8, // starting zoom
});
// #1 - Map
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
});

// #2 - Marker
new mapboxgl.Marker()
.setLngLat(campground.geometry.coordinates)
.setPopup (
    new mapboxgl.Popup({offset: 25})
    .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}</p>`
    )
)
.addTo(map);


/* Documentation:

#1
https://docs.mapbox.com/mapbox-gl-js/guides/install/?q=marker&size=n_10_n
P.S.: mapToken is the name of the variable in the show page, its a reference

#2
//https://docs.mapbox.com/mapbox-gl-js/example/add-a-marker/


*/
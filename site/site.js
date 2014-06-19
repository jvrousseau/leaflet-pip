var leafletPip = require('../'),
    map = L.map('map').setView([37.8, -88], 7),
    gjLayer = L.geoJson(broken);

L.tileLayer('http://a.tiles.mapbox.com/v3/tmcw.map-l1m85h7s/{z}/{x}/{y}.png')
    .addTo(map);

L.marker([38.08268954483802, -89.36279296875]).addTo(map)
            .bindPopup("Click this poly and PIP will return the layer clicked")

L.marker([37.37888785004524, -88.06640625]).addTo(map)
    .bindPopup("Click on this poly and PIP will (erroneously) not return the layer clicked")

gjLayer.addTo(map);

gjLayer.on('click', function (e) {
    console.log(e.latlng);
    var res = leafletPip.pointInLayer([e.latlng.lng, e.latlng.lat], gjLayer, false);
    if (res.length == 0) {
        console.error("uh oh");
    } else {
        console.log(res);
    }
});

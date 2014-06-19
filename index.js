var pip = require('point-in-polygon');

function getLls(l) {
    var lls = l.getLatLngs(), o = [];
    for (var i = 0; i < lls.length; i++) o[i] = [lls[i].lng, lls[i].lat];
    return o;
}

function getMultiLls(l) {
    /*var lls = l.getLatLngs(), o = [];
    for (var j = 0; j < lls.length; j++) {
        o[j] = [];
        for (var i = 0; i < lls.length; i++) o[j][i] = [lls[i].lng, lls[i].lat];
    }*/
    return l.feature.geometry.coordinates[0];
}

var leafletPip = {
    bassackwards: false,
    pointInLayer: function(p, layer, first) {
        'use strict';
        if (p instanceof L.LatLng) p = [p.lng, p.lat];
        if (leafletPip.bassackwards) p.reverse();

        var results = [];
        layer.eachLayer(function(l) {
            if (first && results.length) return;
            // multipolygon
            var lls = [];
            if (l instanceof L.MultiPolygon) {
                lls = lls.concat(getMultiLls(l));
            } else if (l instanceof L.Polygon) {
                lls.push(getLls(l));
            }
            for (var i = 0; i < lls.length; i++) {
                if (pip(p, lls[i])) results.push(l);
            }
        });
        return results;
    }
};

module.exports = leafletPip;

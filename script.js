ymaps.ready(function(){
    var coords;
    var map;
    // Create map

    var geoCode = ymaps.geocode('Москва').then(function(res){
        // var obj = res.geoObjects.get(0);
        coords = res.geoObjects.get(0).geometry.getCoordinates();
        map = new ymaps.Map ("map", {
            center: coords,
            zoom: 11,
            behaviors: ['default', 'scrollZoom']
        });
    });

    // .then(function (res) {
    //     var firstGeoObject = res.geoObjects.get(0),
    //         bounds = firstGeoObject.properties.get('boundedBy');
    //     coords = firstGeoObject.geometry.getCoordinates(),

    //     map.setBounds(bounds, {
    //         checkZoomRange: true
    //     });
    // });

    // Create rectangle
    // var rect = new ymaps.Rectangle([
    //     [55.70, 37.50],
    //     [55.80, 37.75]
    // ], {}, {
    //     fill: false,
    //     strokeColor: "fa0",
    //     strokeWidth: 4
    // });
    // // Create triangle
    // var triangle = new ymaps.Polygon([
    //      [[55.80, 37.50],[55.85, 37.63],[55.80, 37.75]]
    // ], {}, {
    //     fill: false,
    //     strokeColor: "f00",
    //     strokeWidth: 4
    // });
    
    // // Add rectangle on map
    // map.geoObjects.add(rect);
    // // Add triangle on map
    // map.geoObjects.add(triangle);
});
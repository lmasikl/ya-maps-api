ymaps.ready(function(){
    var createMap = function() {
        ymaps.geocode('Москва').then(function(result){
            var coordinates = result.geoObjects.get(0).geometry.getCoordinates();
            var map = new ymaps.Map ("map", {
                center: coordinates,
                zoom: 11,
                behaviors: ['default', 'scrollZoom'],
                adjustZoomOnTypeChange: true
            });
            createHouse(map);
        });
    };

    var createHouse = function(map) {
        // Params direction 0 - longtitude, 1 - latitude. Default 0.
        var getHalfSize = function(direction){
            // Check is direction correct
            if (direction != 0 && direction != 1) {
                direction = 0;
            }
            // Get size
            var size = (mapSize[1][direction] - mapSize[0][direction]) / 4;
            // Check is positive value
            if (size < 0) {
                size = -1 * size;
            }
            return size;
        }

        var mapSize = map.getBounds();
        var mapCenter = map.getCenter();

        var size = getHalfSize(0);
        var _size = getHalfSize(0);
        // Choice min from two sizes
        if (size > _size) {
            size = _size;
        }

        createRectangle(map, size, mapCenter);
        createTriangle(map, size, mapCenter);
    }

    var createRectangle = function(map, size, center) {
        rect = new ymaps.Rectangle([
            [center[0] - size / 2, center[1] - size], 
            [center[0] + size / 2, center[1] + size]
        ], {}, {
            fill: false,
            strokeColor: "f90",
            strokeWidth: 4
        });
        map.geoObjects.add(rect);
    };

    var createTriangle = function(map, size, center) {
        var triangle = new ymaps.Polygon([[
            [center[0] + size / 2, center[1] - size],
            [center[0] + size, center[1]],
            [center[0] + size / 2, center[1] + size]
        ]], {}, {
            fill: false,
            strokeColor: "f00",
            strokeWidth: 4
        });
        map.geoObjects.add(triangle);
    };

    createMap();
});
var HouseCreator = {
    map: null,
    getSegmentLength: function() {
        /**
        * @brief Calculate segment length from map size
        * @param direction {Number}
        *       0 - logtitude (default)
        *       1 - latitude
        */
        var getLength = function(direction){
            // Check is direction correct
            if (direction != 0 && direction != 1) {
                direction = 0;
            }
            var mapSize = HouseCreator.map.getBounds();
            var length = (mapSize[1][direction] - mapSize[0][direction]) / 4;
            if (length < 0) {
                length = -1 * length;
            }
            return length;
        };

        var segment = getLength(0);
        var _segment = getLength(1);
        // Choice min from two sizes
        if (segment > _segment) {
            segment = _segment;
        }

        return segment;
    },
    createMap: function(callback) {
        ymaps.geocode('Москва').then(function(result){
            var coordinates = result.geoObjects.get(0).geometry.getCoordinates();
            HouseCreator.map = new ymaps.Map ("map", {
                center: coordinates,
                zoom: 11,
                behaviors: ['default', 'scrollZoom'],
                adjustZoomOnTypeChange: true
            });

            callback();
        });
    },
    createHouse: function() {
        HouseCreator.createRectangle();
        HouseCreator.createTriangle();
    },
    createRectangle: function() {
        var segmentLength = HouseCreator.getSegmentLength();
        var center = HouseCreator.map.getCenter();

        var rect = new ymaps.Rectangle([
            [center[0] - segmentLength / 2, center[1] - segmentLength], 
            [center[0] + segmentLength / 2, center[1] + segmentLength]
        ], {}, {
            fill: false,
            strokeColor: "f90",
            strokeWidth: 4
        });
        HouseCreator.map.geoObjects.add(rect);
    },
    createTriangle: function() {
        var segmentLength = HouseCreator.getSegmentLength();
        var center = HouseCreator.map.getCenter();;

        var triangle = new ymaps.Polygon([[
            [center[0] + segmentLength / 2, center[1] - segmentLength],
            [center[0] + segmentLength, center[1]],
            [center[0] + segmentLength / 2, center[1] + segmentLength]
        ]], {}, {
            fill: false,
            strokeColor: "f00",
            strokeWidth: 4
        });
        HouseCreator.map.geoObjects.add(triangle);
    }
};
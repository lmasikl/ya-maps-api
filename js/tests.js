var myMath = {
    calcAngle: function(a, b, c) {
        var x1 = a[0] - b[0];
        var x2 = c[0] - b[0];
        var y1 = a[0] - b[0];
        var y2 = c[0] - b[0];
        var d1 = Math.sqrt(x1 * x1 + y1 * y1);
        var d2 = Math.sqrt(x2 * x2 + y2 * y2);
        if (d1 * d2 == 0) {
            return 90;
        }
        return Math.acos((x1 * x2 + y1 * y2)/ (d1 * d2));
    }
};

window.onload = function () {
    var creator = HouseCreator;
    asyncTest(creator.createMap('Москва', 'map', HouseCreator.createHouse), function(){
        ok(document.getElementById('map'), 'Document has container');
        ok(document.getElementById('map').getElementsByTagName('ymaps'), 'Container has map');
        // expect( 4 );
        // setTimeout(function(){
        //     equal(creator.map.getCenter()[0], 55.75367599999372, 'Latitude correct');
        //     equal(creator.map.getCenter()[1], 37.61989899999996, 'Longtitude correct');
        //     start();
        // }, 4000);
        expect( 6 );
        setTimeout(function(){
            creator.map.geoObjects.each(function(obj){
                var bounds = obj.geometry.getBounds();
                var error = 10;
                var x = Math.floor((bounds[1][0] - bounds[0][0]) * error) / error;
                var y = Math.floor((bounds[1][1] - bounds[0][1]) * error) / error;
                equal(x, y);
                var angle = myMath.calcAngle([
                    bounds[0][0], bounds[1][0]
                ], bounds[0], [
                    bounds[1][0], bounds[0][1]
                ]);
                equal(angle, 90);
            });
            start();
        }, 6000);
    });
};
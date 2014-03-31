var myMath = {
    calcAngle: function(a, b, c) {  
        var x1 = a[0] - b[0];
        var x2 = c[0] - b[0];

        var y1 = a[1] - b[1];
        var y2 = c[1] - b[1];

        var d1 = Math.sqrt(x1 * x1 + y1 * y1);
        var d2 = Math.sqrt(x2 * x2 + y2 * y2);

        return Math.acos((x1 * x2 + y1 * y2)/ (d1 * d2)) * (180 / Math.PI);
    }
};

window.onload = function () {
    var creator = HouseCreator;
    var error = 10;
    asyncTest(creator.createMap('Москва', 'map', HouseCreator.createHouse), function(){
        ok(document.getElementById('map'), 'Document has container');
        ok(document.getElementById('map').getElementsByTagName('ymaps'), 'Container has map');
        
        expect( 14 );
        setTimeout(function(){
            
            equal(
                Math.round(creator.map.getCenter()[0] * error) / error, 
                Math.round(55.75367599999372 * error) / error, 
                'Latitude correct'
            );
            equal(
                Math.round(creator.map.getCenter()[1] * error) / error, 
                Math.round(37.61989899999996 * error) / error, 
                'Longtitude correct'
            );

            var i = 0
            creator.map.geoObjects.each(function(obj){
                var coord = obj.geometry.getCoordinates();
                if (i == 0) {
                    var x = Math.floor((coord[1][0] - coord[0][0]) * error) / error;
                    var y = Math.floor((coord[1][1] - coord[0][1]) * error) / error;
                    equal(x, y, 'Sides equal');
                    equal(myMath.calcAngle([0, 1], [0, 0], [1, 0]), 90, 'Math correct');
                    var sw_angle = myMath.calcAngle(
                        [coord[0][0], coord[1][1]], 
                        coord[0], 
                        [coord[1][0], coord[0][1]]
                    );
                    var ne_angle = myMath.calcAngle(
                        [coord[0][0], coord[1][1]],
                        coord[1],
                        [coord[1][0], coord[0][1]]
                    );
                    equal(ne_angle, 90, 'NE rect angle 90 degrees');
                    equal(sw_angle, 90, 'SW rect angle 90 degrees');
                    equal(ne_angle, sw_angle,  'Rect angles equal');
                } else if (i == 1) {
                    var a = coord[0][0];
                    var b = coord[0][1];
                    var c = coord[0][2];
                    var abc = Math.round(myMath.calcAngle(a, b, c) * error) / error;
                    var bca = Math.round(myMath.calcAngle(b, c, a) * error) / error;
                    var cab = Math.round(myMath.calcAngle(c, a, b) * error)/ error;
                    console.log(abc, bca, cab);
                    equal(cab, abc);
                    equal(abc + bca + cab, 180);
                }
                i++;
            });
            start();
        }, 1000);
    });
};
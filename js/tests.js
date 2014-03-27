window.onload = function () {
    var creator = HouseCreator;
    asyncTest(creator.createMap('Москва', 'map', HouseCreator.createHouse), function(){
        var map = document.getElementById('map');
        
        ok(map, 'Document has container');
        ok(map.getElementsByTagName('ymaps'), 'Container has map');
        setTimeout(function(){
            console.log(creator.map.getCenter())
        },500)
    });
};[55.7536759999937, 37.61989899999996]
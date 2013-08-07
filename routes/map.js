
/*
 * GET map.
 */

var db = require('../db');

exports.show = function(req, res){
  db.connection().query('SELECT * FROM locations;', function (error, result) {
    var markers = "";
    result.rows.forEach(function (item) {
      markers += "&markers=color:blue%7Clabel:S%7C"+item.lat+","+item.lon;
    });

    res.render('map', {
      title: 'Map',
      mapInfo: 'center=49.861227,23.923500&zoom=15&size=400x400&sensor=true&maptype=satellite'+markers
    });

  });
};
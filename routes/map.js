
/*
 * GET map.
 */

var db = require('../db');

exports.show = function(req, res){
  db.connection().query('SELECT * FROM locations;', function (error, result) {
    // Rjasne by default
    var center = req.param('position') ? req.param('position') : '49.86240,23.92150';
    var markers = "";
    result.rows.forEach(function (item) {
      markers += "&markers=icon:http://team-radar.herokuapp.com/images/target.png%7Clabel:S%7C"+item.lat+","+item.lon;
    });

    res.render('map', {
      title: 'Map',
      mapInfo: 'center='+center+'&zoom=16&size=640x400&sensor=true&maptype=satellite'+markers
    });

  });
};
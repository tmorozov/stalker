
/*
 * GET map.
 */

var db = require('../db');

exports.show = function(req, res) {
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

exports.dynamic = function(req, res) {
    var center = req.param('position') ? req.param('position') : '49.86240,23.92150';
    var goals = [
      ['цель 1', 49.8622, 23.9171, 4],
      ['цель 2', 49.8623, 23.9172, 5],
      ['цель 3', 49.8624, 23.9173, 3],
      ['цель 4', 49.8621, 23.9174, 2],
      ['цель 5', 49.8620, 23.9175, 1]
    ];

    res.render('map_dynamic', {
      layout: false,
      title: 'Map Dynamic',
      center: center,
      goals: JSON.stringify(goals)
    });
};
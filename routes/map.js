var data = require('../data');

function addPoints(points, src, label) {
  Object.keys(src).forEach(function(key) {
    var val = src[key];
    points.push([key, val[0], val[1], label]);
  });
}

exports.dynamic = function(req, res) {
    var points = [];
    addPoints(points, data.npcs, 'npc');
    addPoints(points, data.targets, 'target');

    var centerStr = req.param('position') ? req.param('position') : '49.86240,23.92150';
    var center = centerStr.split(',');
    if (req.param('position')) {
      points.push(['Я', center[0], center[1], "me"])
    }

    res.render('map_dynamic', {
      layout: false,
      title: 'Map Dynamic',
      center: JSON.stringify(center),
      points: JSON.stringify(points)
    });
};
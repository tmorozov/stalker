var data = require('../data');

function addPoints(points, src, label) {
  Object.keys(src).forEach(function(key) {
    var val = src[key];
    points.push([key, val[0], val[1], label]);
  });
}

function filterTargets(allTargets, myGoals) {
  var targets = {};
  Object.keys(allTargets).forEach(function(key) {
    var val = allTargets[key];
    if(key in myGoals) {
      targets[key] = val;
    }
  });

  return targets;
}

exports.dynamic = function(req, res) {
    var myGoals = req.session.goals || {};
    var myTargets = filterTargets(data.targets, myGoals);
    var points = [];
    addPoints(points, data.npcs, 'npc');
    addPoints(points, myTargets, 'target');

    var centerStr = req.param('position') ? req.param('position') : '49.86240,23.92150';
    var center = centerStr.split(',');
    if (req.param('position')) {
      points.push(['Я', center[0], center[1], "me"])
    }

    res.render('map_dynamic', {
      title: 'Map Dynamic',
      center: JSON.stringify(center),
      points: JSON.stringify(points)
    });
};
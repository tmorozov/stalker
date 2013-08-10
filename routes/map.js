var npcs = {
  npc1 : [49.8623, 23.9172],
  npc2 : [49.8633, 23.9182],
  npc3 : [49.8613, 23.9162]
};

var targets = {
  'code1' : [49.8622, 23.9171],
  'code2' : [49.8624, 23.9173],
  'code3' : [49.8622, 23.9171],
  'code4' : [49.8621, 23.9174]
};

function addPoints(points, src, label) {
  Object.keys(src).forEach(function(key) {
    var val = src[key];
    points.push([key, val[0], val[1], label]);
  });    
}

exports.dynamic = function(req, res) {
    var points = [];
    addPoints(points, npcs, 'npc');
    addPoints(points, targets, 'target');

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
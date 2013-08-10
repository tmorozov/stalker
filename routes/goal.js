var data = require('../data');

exports.index = function(req, res){
  var goals = {};
  Object.keys(data.targets).forEach(function(key) {
    var val = data.targets[key];
    goals[key] = val;
  });

  res.render('goal', { 
    title: 'Current Goals',
    goals: goals
  });
};

exports.create = function(req, res){
  var goals = {};
  Object.keys(data.targets).forEach(function(key) {
    var val = data.targets[key];
    goals[key] = val;
  });

  goals[req.param('goal')] = [0, 0];

  res.render('goal', { 
    title: 'Current Goals',
    goals: goals
  });
};

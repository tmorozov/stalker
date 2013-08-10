var data = require('../data');

exports.index = function(req, res){
  var oldGoals = req.session.goals || {};
  var goals = {};
  Object.keys(data.targets).forEach(function(key) {
    var val = data.targets[key];
    if(key in oldGoals) {
      goals[key] = val;
    }
  });

  res.render('goal', { 
    title: 'Current Goals',
    goals: goals
  });
};

exports.create = function(req, res){
  req.session.goals = req.session.goals || {};

  req.session.goals[req.param('goal')] = true;
  var oldGoals = req.session.goals || {};

  var goals = {};
  Object.keys(data.targets).forEach(function(key) {
    var val = data.targets[key];
    if(key in oldGoals) {
      goals[key] = val;
    }
  });

  res.render('goal', { 
    title: 'Current Goals',
    goals: goals
  });
};

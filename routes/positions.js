var tokens = require('../tokens');

exports.updateMe = function(req, res){
  var token = req.headers['token'];

console.log(req.headers, token, tokens);

  if (tokens.all[token]) {
    tokens.all[token]['location'] = req.body.location;
    res.json(tokens.all[token]);
  } else {
    res.status(404).send('Not found');
  }
};

exports.index = function(req, res){
  var positions = [];
  Object.keys(tokens.all).forEach(function(item) {
    var position = {
      name: tokens.all[item].name,
      location: tokens.all[item].location
    };

    positions.push(position);
  });

  res.json(positions);
};

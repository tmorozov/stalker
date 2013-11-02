var tokens = require('../tokens');

exports.updateMe = function(req, res){
  var token = req.headers['token'];

  if (! token ) {
    res.status(401).send('Not authorized');
    return;
  }

  if (!tokens.all[token]) {
    tokens.addToken(token, req.body.name);
  }

  tokens.all[token]['location'] = req.body.location;
  res.json(tokens.all[token]);
};

exports.index = function(req, res){
  var token = req.headers['token'];
  var positions = [];

  Object.keys(tokens.all).
    filter(function(item) {
      return item != token;
  }).
    forEach(function(item) {
      var position = {
        name: tokens.all[item].name,
        location: tokens.all[item].location,
        type: tokens.all[item].type
      };

      positions.push(position);
  });

  res.json(positions);
};

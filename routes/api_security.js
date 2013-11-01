var crypto = require('crypto');
var tokens = require('../tokens');

exports.create = function(req, res){
  var shasum = crypto.createHash('sha1');
  shasum.update(req.body.name);
  shasum.update(req.body.pwd);

  var token = shasum.digest('hex');
  var type = (req.body.name === 'пилот') ? 'npc' : 'me'

  tokens.all[token] = {
    // password: req.body.pwd,
    name: req.body.name,
    type: type
  };

  res.json({
    token: token
  });
};

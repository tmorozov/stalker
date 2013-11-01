var crypto = require('crypto');
var tokens = require('../tokens');

exports.create = function(req, res){
  var shasum = crypto.createHash('sha1');
  shasum.update(req.body.name);
  shasum.update(req.body.pwd);

  var token = shasum.digest('hex');

  tokens.all[token] = {
    // password: req.body.pwd,
    name: req.body.name
  };

  res.json({
    token: token
  });
};


/*
 * GET users listing.
 */

var db = require('../db');

exports.list = function(req, res){
  db.connection().query('SELECT * FROM users;', function (error, result) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(JSON.stringify(result.rows));
  });
};

/*
 * GET locations.
 */

var db = require('../db');

exports.list = function(req, res){
  db.connection().query('SELECT * FROM locations;', function (error, result) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(JSON.stringify(result.rows));
  });
};
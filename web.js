var express = require("express");
var app = express();

var pg = require('pg');

var db_connection;
var db_done;

pg.connect(process.env.DATABASE_URL, function(err, connection, done) {
  if(err) {
    done();
    return console.error(err);
  }

  db_connection = connection;
  console.log('db connected');

  db_done = done;

});

app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/users', function(request, response) {
  db_connection.query('SELECT * FROM users;', function (error, result) {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    response.end(JSON.stringify(result.rows));
  });
});

app.get('/locations', function(request, response) {
  db_connection.query('SELECT * FROM locations;', function (error, result) {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    response.end(JSON.stringify(result.rows));
  });
});

app.get('/maps', function(request, response) {
  response.send('<img src="http://maps.googleapis.com/maps/api/staticmap?center=49.861227,23.923500&zoom=14&size=200x200&sensor=false&maptype=satellite">');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

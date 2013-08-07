var pg = require('pg');

var db_connection;
var db_done;

function open() {
  pg.connect(process.env.DATABASE_URL, function(err, connection, done) {
    if(err) {
      done();
      return console.error(err);
    }

    db_connection = connection;
    console.log('db connected');

    db_done = done;

  });

}

function connection() {
  return db_connection;
}

function close () {
  db_done();
}

exports.open = open;
exports.connection = connection;
exports.close = close;
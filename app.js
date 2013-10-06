
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// routes
var routes = require('./routes');
var map = require('./routes/map');
var goal = require('./routes/goal');
var test = require('./routes/test');
var ngapp = require('./routes/ngapp');

app.use(express.compress());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
// var oneDay = 86400000;
// app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));
app.use(express.static(path.join(__dirname, 'public')));

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

app.use(express.errorHandler());
app.locals.pretty = true;


app.get('/', ngapp.index);
app.get('/partials/:name', routes.partials);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


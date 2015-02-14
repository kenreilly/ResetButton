
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
    res.sendfile("public/index.html");
});
app.get("/quotes", function(req, res) {
    res.sendfile("public/quotes.html");
});
app.get("/getQuote", function(req, res){
    var file = __dirname + '/public/quotes.json';
 
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
 
        data = JSON.parse(data);
        var item = data[Math.floor(Math.random()*data.length)];
        res.json({ randomQuote: item });
    });
});
app.post('/saveQuotes', function(req, res) {
    var quotes = req.body.quotes;
    var outputFilename = 'public/quotes.json';

    fs.writeFile(outputFilename, JSON.stringify(quotes, null, 4), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("JSON saved to " + outputFilename);
        }
    });

    res.end();
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var readFile = require('fs').readFileSync;

var getMainPage = require('./lib/js/getMainPage.js');
var getWordMode = require('./lib/js/getWordMode.js');
var getDescriptionMode = require('./lib/js/getDescriptionMode.js');

app.set('port', (process.env.PORT || 3210));

// serve-favicon is used to display favicon
// express.static serves all necessary assets
app.use(favicon(__dirname + '/images/favicon.ico'));
app.use(express.static(__dirname));

// paths created

app.get('/', function (req, res) {
  getMainPage(req, res);
});

app.get('/wordMode', function (req, res) {
  getWordMode(req, res);
});

app.get('/descriptionMode', function (req, res) {
  getDescriptionMode(req, res);
});

app.listen(app.get('port'), function () {
  console.log('App listening on port 3210!');
});

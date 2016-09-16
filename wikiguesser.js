var express = require('express');
var app = express();
var readFile = require('fs').readFileSync;

var getMainPage = require('./lib/js/getMainPage.js');
var getWordMode = require('./lib/js/getWordMode.js');
var getDescriptionMode = require('./lib/js/getDescriptionMode.js');

app.set('port', (process.env.PORT || 3000));

// loads necessary css and js
app.get('/css/app.css', function (req, res) {
  res.send(readFile("./css/app.css", "UTF8"));
});

app.get('/lib/js/gameFuncs.js', function (req, res) {
  res.send(readFile("./lib/js/gameFuncs.js", "UTF8"));
});

app.get('/lib/js/mainPage.js', function (req, res) {
  res.send(readFile("./lib/js/mainPage.js", "UTF8"));
});

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
  console.log('App listening on port 3000!');
});

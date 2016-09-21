var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var readFile = require('fs').readFileSync;

var getMainPage = require('./lib/js/getMainPage.js');
var getWordMode = require('./lib/js/getWordMode.js');
var getDescriptionMode = require('./lib/js/getDescriptionMode.js');

app.set('port', (process.env.PORT || 4000));

app.use(favicon(__dirname + '/favicon.ico'));

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

app.get('/images/profile.png', function (req, res) {
  res.send(readFile("./images/profile.png"));
});

app.get('/images/GitHub.png', function (req, res) {
  res.send(readFile("./images/GitHub.png"));
});

app.get('/images/LinkedIn.jpg', function (req, res) {
  res.send(readFile("./images/LinkedIn.jpg"));
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
  console.log('App listening on port 4000!');
});

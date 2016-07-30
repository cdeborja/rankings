var express = require('express');
var app = express();
var getRankings = require('./getRankings');
var readFile = require('fs').readFileSync;

app.get('/index.css', function (req, res) {
  console.log("GOT to css");
  res.send(readFile("./index.css", "UTF8"));
});

app.get('/index.js', function (req, res) {
  console.log("GOT to js");
  res.send(readFile("./index.js", "UTF8"));
});

app.get('/name/:name', function (req, res) {
  var rankings = getRankings(req, res);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//

var express = require('express');
var app = express();
var getRankings = require('./getRankings');

app.get('/', function (req, res) {
  var rankings = getRankings(res);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//

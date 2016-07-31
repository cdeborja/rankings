var request = require('request');
var readFile = require('fs').readFileSync;
var handlebars = require('handlebars');

module.exports = function getRankings (req, res) {
  request('http://rank.shoryuken.com/api/player/name/' + req.params.name, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      //send takes a string as an argument
      res.send(render(data));
    }
  });
};

function render (data) {
  var parsedData = JSON.parse(data);
  var source = readFile("./playerInfo.html", "UTF8");
  var template = handlebars.compile(source);

  var info = {
    'name': parsedData.name,
    'game': parsedData.mainGame
  };

  return template(info);
}

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

  if (parsedData.country === "JP") {
    parsedData.country = "Japan";
  } else if (parsedData.country === "US") {
    parsedData.country = "United States";
  } else if (parsedData.country === "SE") {
    parsedData.country = "Sweden";
  } else if (parsedData.country === "NL") {
    parsedData.country = "Netherlands";
  }

  if (parsedData.realname === null) {
    parsedData.realname = "N/A";
  }

  tournamentList = [];
  for (var i = 0; i < parsedData.results.length; i++) {
    tournamentList.push(parsedData.results[i].tournamentname);
  }
  
  var info = {
    'name': parsedData.name,
    'realName': parsedData.realname,
    'country': parsedData.country,
    'mainGame': parsedData.mainGame,
    'twitter': parsedData.twitter,
    'teams': parsedData.teams,
    //rankings is not an array, it's an object pointing to other objects
    'rankings': parsedData.rankings,
    'tournaments': tournamentList,
    'allData': data
  };

  return template(info);
}

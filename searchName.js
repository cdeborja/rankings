var request = require('request');

module.exports = function searchName (req, res) {

  request('http://rank.shoryuken.com/api/search?type=player&fuzzy=true&query=' + req.params.name, function (error, response, data) {
    if (!error && response.statusCode == 200) {
      //send takes a string as an argument
      parsedData = JSON.parse(data);
      var playerNames = [];
      // only takes first 10 max responses
      for (var i = 0; i < 10 && i < parsedData.length; i++) {
        playerNames.push([parsedData[i].name, parsedData[i].realname]);
      }
      res.send(playerNames);
    }
  });

};

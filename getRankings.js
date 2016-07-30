var request = require('request');

module.exports = function getRankings (res) {
    request('http://rank.shoryuken.com/api/top?game=UMVC3&size=20&format=json', function (error, response, data) {
      if (!error && response.statusCode == 200) {
        res.send(render(data));
      }
  });
};

function render (data) {
  var parsedData = JSON.parse(data);
  return (
    "<p>" + parsedData[0].name + "</p>"
  );
}

var readFile = require('fs').readFileSync;
var handlebars = require('handlebars');
var request = require('request');

module.exports = function landingPage (req, res) {
  res.send(render());
};

function render () {
  var source = readFile("./lib/html/mainPage.html","UTF8");
  var template = handlebars.compile(source);

  return template();
}

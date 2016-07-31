var readFile = require('fs').readFileSync;
var handlebars = require('handlebars');

module.exports = function landingPage (req, res) {
  console.log("main page");
  res.send(render());
};

function render () {
  var source = readFile("./landingPage.html","UTF8");
  var template = handlebars.compile(source);

  return template();
}

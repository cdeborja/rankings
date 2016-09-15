var request = require('request');
var readFile = require('fs').readFileSync;
var handlebars = require('handlebars');

module.exports = function gameMode (req, res) {
  request('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5', function(error,response,data) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(data);
      var randomSelectedId = Math.floor(Math.random() * 4);
      var selectedId = parsedData.query.random[randomSelectedId].id;
      // makes query to the api for the selected ID
      request('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&exsentences=3&pageids=' + selectedId, function(error,response,selectedData) {
        //send takes a string as an argument
        res.send(render(parsedData, selectedData, randomSelectedId));
      });
    }
  });
};

function render (parsedData, selectedData, randomSelectedId) {
  var source = readFile("./lib/html/wordMode.html","UTF8");
  var template = handlebars.compile(source);

  selectedData = JSON.parse(selectedData);

  // need specfic pageId to get to extract information
  var pageId = parsedData.query.random[randomSelectedId].id;

  var titleArr = [];

  for (var i = 0; i < parsedData.query.random.length; i++) {
    titleArr.push(parsedData.query.random[i].title);
  }
  var info = {
    "option1": titleArr[0],
    "option2": titleArr[1],
    "option3": titleArr[2],
    "option4": titleArr[3],
    "selectedId": randomSelectedId,
    "selectedData": selectedData.query.pages[pageId].extract.replace(titleArr[randomSelectedId], "ANSWER")
  };

  return template(info);
}

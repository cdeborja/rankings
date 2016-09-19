var request = require('request');
var readFile = require('fs').readFileSync;
var handlebars = require('handlebars');

module.exports = function gameMode (req, res) {
  request('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=5', function(error,response,data) {
    if (!error && response.statusCode == 200) {
      var parsedData = JSON.parse(data);
      var firstTitleId = parsedData.query.random[0].id;
      var secondTitleId = parsedData.query.random[1].id;
      var thirdTitleId = parsedData.query.random[2].id;
      var fourthTitleId = parsedData.query.random[3].id;
      request('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&exsentences=3&pageids=' + firstTitleId, function(error,response, firstTitleData) {
        request('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&exsentences=3&pageids=' + secondTitleId, function(error,response, secondTitleData) {
          request('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&exsentences=3&pageids=' + thirdTitleId, function(error,response, thirdTitleData) {
            request('https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&exsentences=3&pageids=' + fourthTitleId, function(error,response, fourthTitleData) {
              //send takes a string as an argument
              res.send(render(parsedData, firstTitleData, secondTitleData, thirdTitleData, fourthTitleData));
            });
          });
        });
      });
    }
  });
};

function render (parsedData, firstTitleData, secondTitleData, thirdTitleData, fourthTitleData) {
  var source = readFile("./lib/html/descriptionMode.html","UTF8");
  var template = handlebars.compile(source);

  firstTitleData = JSON.parse(firstTitleData);
  secondTitleData = JSON.parse(secondTitleData);
  thirdTitleData = JSON.parse(thirdTitleData);
  fourthTitleData = JSON.parse(fourthTitleData);

  var firstTitleId = parsedData.query.random[0].id;
  var secondTitleId = parsedData.query.random[1].id;
  var thirdTitleId = parsedData.query.random[2].id;
  var fourthTitleId = parsedData.query.random[3].id;

  var randomSelectedId = Math.floor(Math.random() * 4);
  var chosenTitle = parsedData.query.random[randomSelectedId].title;
  var re = / /gi;
  var info = {
    "selectedTitle": chosenTitle,
    "selectedId" : randomSelectedId,
    "option1": firstTitleData.query.pages[firstTitleId].extract.replace(firstTitleData.query.pages[firstTitleId].title,"ANSWER"),
    "title1": firstTitleData.query.pages[firstTitleId].title.replace(re,"_"),
    "option2": secondTitleData.query.pages[secondTitleId].extract.replace(secondTitleData.query.pages[secondTitleId].title,"ANSWER"),
    "title2": secondTitleData.query.pages[secondTitleId].title.replace(re,"_"),
    "option3": thirdTitleData.query.pages[thirdTitleId].extract.replace(thirdTitleData.query.pages[thirdTitleId].title, "ANSWER"),
    "title3": thirdTitleData.query.pages[thirdTitleId].title.replace(re,"_"),
    "option4": fourthTitleData.query.pages[fourthTitleId].extract.replace(fourthTitleData.query.pages[fourthTitleId].title, "ANSWER"),
    "title4": fourthTitleData.query.pages[fourthTitleId].title.replace(re,"_"),
  };

  return template(info);
}

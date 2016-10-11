function checkChoice () {
  var answerId = document.getElementsByClassName("answer")[0].id;
  var clickedId = event.currentTarget.id;
  var wikiDiv = event.currentTarget.parentElement.children[1].classList;
  if (answerId === clickedId) {
    wikiDiv.remove("disable-wiki");
    wikiDiv.add("enable-wiki");
    event.currentTarget.classList.add("correct");
  } else {
    wikiDiv.remove("disable-wiki");
    wikiDiv.add("enable-wiki");
    event.currentTarget.classList.add("wrong");
  }
}

function goToWiki () {
  var possibleAnswer, endpoint, html, re;
  possibleAnswer = event.currentTarget.parentElement.children[0];

  if (possibleAnswer.classList.contains("wrong") ||
     possibleAnswer.classList.contains("correct")) {
      if (possibleAnswer.classList.length > 1) {
        endpoint = possibleAnswer.classList[0];
      } else {
        html = possibleAnswer.innerHTML;
        re = / /gi;
        endpoint = html.replace(re,"_");
      }
      window.open("https://en.wikipedia.org/wiki/" + endpoint);
  }
}

function refresh () {
  document.location.reload();
}

function goToMain () {
  window.location = "/";
}

document.addEventListener("DOMContentLoaded", function (event) {
});

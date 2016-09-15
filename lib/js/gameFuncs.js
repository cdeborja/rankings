function checkChoice () {
  var answerId = document.getElementsByClassName("answer")[0].id;
  var clickedId = event.currentTarget.id;

  if (answerId === clickedId) {
    event.currentTarget.parentElement.children[1].classList.remove("disable-wiki");
    event.currentTarget.parentElement.children[1].classList.add("enable-wiki");
    event.currentTarget.classList.add("correct");
  } else {
    event.currentTarget.parentElement.children[1].classList.remove("disable-wiki");
    event.currentTarget.parentElement.children[1].classList.add("enable-wiki");
    event.currentTarget.classList.add("wrong");
  }
}

function goToWiki () {
  if (event.currentTarget.parentElement.children[0].classList.contains("wrong") ||
      event.currentTarget.parentElement.children[0].classList.contains("correct")) {
      var html = event.currentTarget.parentElement.children[0].innerHTML;
      var re = / /gi;
      var endpoint = html.replace(re,"_");
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
  console.log('DOM Fully Loaded');
});

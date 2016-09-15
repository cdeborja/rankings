function checkChoice (e) {
  var answerId = document.getElementsByClassName("answer")[0].id;
  var clickedId = event.currentTarget.id;

  //checks if selected already
  if (event.currentTarget.classList.length === 1) {
    var re = / /gi;
    var string = event.currentTarget.innerHTML;
    var endpoint = string.replace(re,"_");

    window.open("https://en.wikipedia.org/wiki/" + endpoint);
  }
  if (answerId === clickedId) {
    event.currentTarget.classList.add("correct");
  } else {
    event.currentTarget.classList.add("wrong");
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('DOM Fully Loaded');
});

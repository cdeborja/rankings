function handleClick (e) {
  var answerId = document.getElementsByClassName("answer")[0].id;
  var clickedId = event.currentTarget.id;

  if (answerId === clickedId) {
    console.log("found right answer");
  } else {
    console.log("wrong!!!");
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('DOM Fully Loaded');
});

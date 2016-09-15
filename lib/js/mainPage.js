function goToMultipleWord () {
  window.location = "/wordMode";
  console.log("go to multiple word");
}

function goToMultipleDefinition () {
  window.location = "/definitionMode";
  console.log("go to multiple definition");
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('DOM Fully Loaded');
});

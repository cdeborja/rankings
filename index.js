
function handleClick () {
  var el = document.getElementsByClassName("user")[0].value;
  window.location = "/name/" + el;
}

document.addEventListener("DOMContentLoaded", function (event) {
  console.log('DOM Fully Loaded');

  var input = document.getElementsByClassName("user")[0];
  var nameList;

  input.addEventListener("keyup", function (e) {
    if (this.value.length > 2) {
      searchName(this.value);
    }
  });
});

function searchName(query) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', encodeURI('/search/' + query));
  xhr.onload = function() {
    if (xhr.status === 200) {
      nameList = JSON.parse(this.response);
    }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

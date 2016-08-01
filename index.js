
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
    } else {
      document.getElementsByClassName("autocomplete")[0].innerHTML = "";
    }
  });
});

function searchName(query) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', encodeURI('/search/' + query));
  xhr.onload = function() {
    if (xhr.status === 200) {
      nameList = JSON.parse(this.response);
      document.getElementsByClassName("autocomplete")[0].innerHTML = "";
      for (var i = 0; i < nameList.length; i++) {
        document.getElementsByClassName("autocomplete")[0].innerHTML += ("<li>" + nameList[i][0] + "</li>");
      }
    }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

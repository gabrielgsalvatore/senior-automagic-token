
function searchBearerToken() {
  chrome.cookies.get({
    url: "https://www.platform.senior.com.br",
    name: "com.senior.pau.token"
  }, function(cookie) {
    if (cookie) {
      var parsedCookie = JSON.parse(JSON.parse(cookie.value));
      const bearerToken = "Bearer "+parsedCookie.access_token;
      console.log(bearerToken);
      document.getElementById("text").innerHTML = bearerToken;

    } else {
      document.getElementById("text").innerHTML = "&Eacute; necess&aacute;rio estar autenticado na plataforma G7";
    }
  });
}

function searchToken() {
  chrome.cookies.get({
    url: "https://www.platform.senior.com.br",
    name: "com.senior.pau.token"
  }, function(cookie) {
    if (cookie) {
      var parsedCookie = JSON.parse(JSON.parse(cookie.value));
      const bearerToken = parsedCookie.access_token;
      console.log(bearerToken);
      document.getElementById("text").innerHTML = bearerToken;

    } else {
      document.getElementById("text").innerHTML = "&Eacute; necess&aacute;rio estar autenticado na plataforma G7";
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("copybtn").addEventListener("click", copyText);
  const checkBearer = document.getElementById("bearer_check");
  checkBearer.addEventListener("change", function(){
    if(checkBearer.checked){
      searchToken();
    }else{
      searchBearerToken();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("copybtn").addEventListener("click", copyText);
});

function copyText(){
  var copyText = document.getElementById("text");
  copyText.select();
  navigator.clipboard.writeText(copyText.value);
}

window.onload = function() {
  searchBearerToken();
}
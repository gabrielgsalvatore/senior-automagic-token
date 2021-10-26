let bearerToken = "Bearer: ";

function updateUserLoginStatusUi() {
    chrome.cookies.get({
      url: "https://www.platform.senior.com.br",
      name: "com.senior.pau.token"
    }, function(cookie) {
      if (cookie) {
        var parsedCookie = JSON.parse(JSON.parse(cookie.value));
        const bearerToken = "Bearer "+parsedCookie.access_token;
        this.bearerToken = bearerToken;
        console.log(bearerToken);
      } else {
        console.log('no cookie')
      }
    });
  }
  
  chrome.cookies.onChanged.addListener(function(changeInfo) {
    updateUserLoginStatusUi();
  });
  

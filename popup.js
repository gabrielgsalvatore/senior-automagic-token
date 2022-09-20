var currentCookieStore;

function searchBearerToken(currentCookieStore) {
    console.log(currentCookieStore);
    chrome.cookies.get({
        storeId: currentCookieStore,
        url: "https://www.platform.senior.com.br",
        name: "com.senior.token"
    }, function(cookie) {
        if (cookie) {
            var parsedCookie = JSON.parse(decodeURIComponent(cookie.value))
            const bearerToken = "Bearer " + parsedCookie.access_token;
            document.getElementById("text").innerHTML = bearerToken;

        } else {
            document.getElementById("text").innerHTML = "&Eacute; necess&aacute;rio estar autenticado na plataforma G7";
        }
    });
}

async function getCurrentCookieStore() {
    var currentCookieStore;
    var allCookies = await chrome.cookies.getAllCookieStores();
    var allTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    var currentTab = allTabs[0].id;
    for (var windows = 0; windows < allCookies.length; windows++) {
        for (var tabs = 0; tabs < allCookies[windows].tabIds.length; tabs++) {
            if (allCookies[windows].tabIds[tabs] === currentTab) {
                currentCookieStore = allCookies[windows].id;
                return currentCookieStore;
            }
        }
    }

}

function searchUserAndTenant(currentCookieStore) {
    chrome.cookies.get({
        storeId: currentCookieStore,
        url: "https://www.platform.senior.com.br",
        name: "com.senior.token"
    }, function(cookie) {
        if (cookie) {
            var parsedCookie = JSON.parse(decodeURIComponent(cookie.value))
            const user = parsedCookie.username.split('@')[0];
            const tenant = parsedCookie.username.split('@')[1];
            document.getElementById("tenant").innerHTML = tenant;
            document.getElementById("user").innerHTML = user;
        }
    });
}

function searchToken(currentCookieStore) {
    chrome.cookies.get({
        storeId: currentCookieStore,
        url: "https://www.platform.senior.com.br",
        name: "com.senior.token"
    }, function(cookie) {
        if (cookie) {
            var parsedCookie = JSON.parse(decodeURIComponent(cookie.value))
            const bearerToken = parsedCookie.access_token;
            document.getElementById("text").innerHTML = bearerToken;

        } else {
            document.getElementById("text").innerHTML = "&Eacute; necess&aacute;rio estar autenticado na plataforma G7";
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("copybtn").addEventListener("click", copyText);
    const checkBearer = document.getElementById("bearer_check");
    checkBearer.addEventListener("change", async function() {
        this.currentCookieStore = await getCurrentCookieStore();
        if (checkBearer.checked) {
            searchToken(this.currentCookieStore);
        } else {
            searchBearerToken(this.currentCookieStore);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("copybtn").addEventListener("click", copyText);
});

function copyText() {
    var copyText = document.getElementById("text");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
}

window.onload = async function() {
    this.currentCookieStore = await getCurrentCookieStore();
    searchBearerToken(this.currentCookieStore);
    searchUserAndTenant(this.currentCookieStore);
}
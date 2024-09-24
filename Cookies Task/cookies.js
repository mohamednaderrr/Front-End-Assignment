// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie value by name
function getCookie(name) {
    var nameEQ = name + "=";
    var cookiesArray = document.cookie.split(';');
    for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// Function to delete a cookie
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Handlers for the buttons
function setCookieHandler() {
    var name = document.getElementById("cookieName").value;
    var value = document.getElementById("cookieValue").value;
    var days = parseInt(document.getElementById("cookieDays").value, 10);
    setCookie(name, value, days);
    document.getElementById("output").innerText = "Cookie set!";
}

function getCookieHandler() {
    var name = document.getElementById("cookieName").value;
    var value = getCookie(name);
    document.getElementById("output").innerText = value ? "Cookie value: " + value : "Cookie not found";
}

function updateCookieHandler() {
    var name = document.getElementById("cookieName").value;
    var value = document.getElementById("cookieValue").value;
    var days = parseInt(document.getElementById("cookieDays").value, 10);
    setCookie(name, value, days);
    document.getElementById("output").innerText = "Cookie updated!";
}

function deleteCookieHandler() {
    var name = document.getElementById("cookieName").value;
    deleteCookie(name);
    document.getElementById("output").innerText = "Cookie deleted!";
}

var isLoggedIn = localStorage.getItem('isLoggedIn');

if (isLoggedIn !== 'true') {

    window.location.href = 'login.html';
} else {
    var username = localStorage.getItem('username');

    document.getElementById('usernameDisplay').innerText = username;

    document.getElementById('logoutBtn').addEventListener('click', function () {

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');

        window.location.href = 'login.html';
    });
}

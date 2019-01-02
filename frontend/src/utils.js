const IsUserLoggedIn = () => {
    return localStorage.getItem('googleId') ? true : false;
}

const logoutHandle = () => {
    localStorage.removeItem('googleId');
    localStorage.removeItem('avatar');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
}

module.exports = {
    IsUserLoggedIn,
    logoutHandle,
}
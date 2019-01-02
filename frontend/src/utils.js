const IsUserLoggedIn = () => {
    return localStorage.getItem('googleId') ? true : false;
}

const getPathFromUrl = (pathname, path) => {
    return pathname.substring(path.length+1);
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
    getPathFromUrl
}
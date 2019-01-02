const IsUserLoggedIn = () => {
    return localStorage.getItem('code') ? true : false;
}

const getPathFromUrl = (pathname, path) => {
    return pathname.substring(path.length+1);
}

const logoutHandle = () => {
    localStorage.removeItem('code');
    localStorage.removeItem('avatar');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
}

module.exports = {
    IsUserLoggedIn,
    logoutHandle,
    getPathFromUrl
}
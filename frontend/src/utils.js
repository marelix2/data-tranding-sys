const IsUserLoggedIn = () => {
    return localStorage.getItem('code') ? true : false;
}

const logoutHandle = () => {
    localStorage.removeItem('code');
    localStorage.removeItem('avatar');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
};

module.exports = {
    IsUserLoggedIn,
    logoutHandle
}
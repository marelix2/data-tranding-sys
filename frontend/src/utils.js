const IsUserLoggedIn = () => {
    return localStorage.getItem('code') ? true : false;
}

module.exports = {
    IsUserLoggedIn
}
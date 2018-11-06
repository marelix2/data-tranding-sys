
const { google } = require('googleapis');

const googleConfig = {
    clientId: '588208763196-h43ntaum2us5c42svjs27t6lb83qaq06.apps.googleusercontent.com',
    clientSecret: 'w59FTD-4SMIUNJfGvriJj1xo',
    redirect: 'http://localhost:6969/api/public/auth/callback',
}

const connect = () => {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect);
}

module.exports = { connect }
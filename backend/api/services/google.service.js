const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const { google } = require('googleapis');
const GoogleErrorDTO = require('./../dto/GoogleErrorDTO');
const User = require('./../models/User');

const googleConfig = {
    clientId: '588208763196-h43ntaum2us5c42svjs27t6lb83qaq06.apps.googleusercontent.com',
    clientSecret: 'nZc1ZHawpoulzZWPFVT9tpZp',
    redirect: 'http://localhost:3000/login/callback',
}

const connect = () => {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect);
}

const getGooglePlusApi = async (auth) => {
    return google.plus({ version: 'v1', auth });
}

const getGoogleAccountFromCode = async (previousAuth, code) => {

    try {
        const data = await previousAuth.getToken(code);
        const tokens = data.tokens;

        const auth =await connect();
        auth.setCredentials(tokens);

        const plus = await getGooglePlusApi(auth);
        const me = await plus.people.get({ userId: 'me' });
    
        const userGoogleId = me.data.id;
        const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
        const userGoogleName = me.data.displayName;
        const userGoogleAvatar = me.data.image.url;

        return {
            error: null,
            id: userGoogleId,
            email: userGoogleEmail,
            name: userGoogleName,
            avatar: userGoogleAvatar,
            tokens: tokens,
        };

    } catch (err) {
        return { error: new GoogleErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to GoogleApi: ' + err) };
    }
}

const checkIsUserRegistered = async (previousAuth, code) => {

    try {
        const data = await previousAuth.getToken(code);
        const tokens = data.tokens;


        const auth = await connect();
        auth.setCredentials(tokens);

        const plus = await getGooglePlusApi(auth);
        const me = await plus.people.get({ userId: 'me' });
       
        const userGoogleId = me.data.id;
        const userGoogleEmail = me.data.emails[0].value;
        const userGoogleName = me.data.displayName;
        const userGoogleAvatar = me.data.image.url;

        let user = await User.findOne({ where: { username: userGoogleName} });

        if(user === null) {
         user = await User.create({
                username: userGoogleName,
                googleId: userGoogleId,
                email: userGoogleEmail,
                avatar: userGoogleAvatar
            });
        }

        return user;

    } catch (err) {
        return { error: new GoogleErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to GoogleApi: ' + err) };
    }
}

module.exports = {
    connect,
    getGoogleAccountFromCode,
    checkIsUserRegistered
}

const { google } = require('googleapis');

const googleConfig = {
    clientId: '588208763196-h43ntaum2us5c42svjs27t6lb83qaq06.apps.googleusercontent.com',
    clientSecret: 'w59FTD-4SMIUNJfGvriJj1xo',
    redirect: 'http://localhost:3000/login/callback',
}

const connect = () => {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect);
}

const getGooglePlusApi = async (auth)  => {
    return google.plus({ version: 'v1', auth });
}

const getGoogleAccountFromCode = async (previousAuth,code) =>  {


    try {
        const data = await previousAuth.getToken(code);
        const tokens = data.tokens;

    const auth = connect();
    auth.setCredentials(tokens);


    const plus = await getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });

    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    const userGoogleName = me.data.displayName;
    const userGoogleAvatar = me.data.image.url;
    console.log(JSON.stringify(me.data,null,1))
    return {
        error: null,
        id: userGoogleId,
        email: userGoogleEmail,
        name: userGoogleName,
        avatar: userGoogleAvatar,
        tokens: tokens,
    };

    }catch(err) {  
        return { error: new GoogleErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to GoogleApi: ' + err)};
    }
}

module.exports = { connect, getGoogleAccountFromCode}
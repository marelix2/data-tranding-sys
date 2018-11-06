const { connect } = require('./../services/google.servie');

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

const AuthController = () => {
    const getConnectionUrl = (auth) => {
        return auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: defaultScope
        });
    }

    const urlGoogle = () => {
        const auth = connect();
        console.log(JSON.stringify(auth,null,1));
        const url = getConnectionUrl(auth);
        return url;
    }

    return {
        urlGoogle
    }
}


module.exports = AuthController;
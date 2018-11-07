const { connect } = require('./../services/google.servie');
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');

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

    const urlGoogle = (req, res) => {

        try {
            const auth = connect();
            const url = getConnectionUrl(auth);

            return res.status(OK).json({ url });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something goes wrong: ${error}`));
        }

    }

    return {
        urlGoogle
    }
}


module.exports = AuthController;
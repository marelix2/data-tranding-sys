const { connect } = require('../services/google.service');
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const { isUserRegistered, registerUser, getUser} = require('./../services/user.service');

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

const AuthController = () => {
    const auth = connect();

    const getConnectionUrl = (auth) => {
        return auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: defaultScope
        });
    }

    const urlGoogle = (req, res) => {
        try {
            const url = getConnectionUrl(auth);

            return res.status(OK).json({ url });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something goes wrong: ${error}`));
        }

    };

    const authUser = async (req, res) => {
        const {code} = req.body;
        try {
            let user;
            const userRegistered = await isUserRegistered(auth,code);

            console.log(userRegistered);

            if (!userRegistered){
                console.log()
                user = await registerUser(auth,code);
            }else {
                user = await getUser(code);
            }

            return res.status(OK).json({user});
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something goes wrong: ${error}`));
        }
    };

    return {
        urlGoogle,
        authUser
    }
}


module.exports = AuthController;
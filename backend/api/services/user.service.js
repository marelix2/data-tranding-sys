const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');

const { getGoogleAccountFromCode, checkIsUserRegistered } = require('./google.service')

const User = require('./../models/User');

const CheckUserRegistered = async (auth, code) => {

    try {
        const user = await checkIsUserRegistered(auth, code);
        return user;
    } catch (err) {
        return new ErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to database (ApiController)');
    }

}

const getUser = async (username) => {
    try {
    
            return await User.findOne({ where: { username: username } });
        
    } catch (err) {
        return new ErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to database (ApiController)');
    }
}

module.exports = {
    CheckUserRegistered,
    getUser,
}
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');

const { getGoogleAccountFromCode } = require('./google.service')

const User = require('./../models/User');

const isUserRegistered = async (auth,code) => {

    try {
        const userInfo = await getGoogleAccountFromCode(auth, code);
        if (userInfo.error) {
            throw user.error;
        }else {
            const user = await User.findOne({ where: { username: userInfo.username} });
            if (user) return true;
        }
      
    } catch (err) {
        return new ErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to database (ApiController)');
    }

    return false;
}

const registerUser = async (auth, code) => {
    console.log("co tam");
    try {
        const userInfo = await getGoogleAccountFromCode(auth, code);
        if (userInfo.error) {
            return user.error;
        } else {
            return await User.create({
                username: userInfo.name,
                googleId: userInfo.googleId,
                email: userInfo.email,
                avatar: userInfo.avatar
            })
        }

    } catch (err) {
        return new ErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to database (ApiController)');
    }
}

const getUser = async (code) => {
    try {
        return await User.findOne({ where: { code: code } });
    } catch (err) {
        return new ErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to database (ApiController)');
    }
}

module.exports = {
    isUserRegistered,
    registerUser,
    getUser,
}
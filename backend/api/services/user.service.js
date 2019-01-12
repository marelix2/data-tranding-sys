const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const RoleModel = require('./../models/Role');
const Wallet = require('./../models/Wallet');

const { getGoogleAccountFromCode, checkIsUserRegistered } = require('./google.service')

const User = require('./../models/User');

const CheckUserRegistered = async (auth, code) => {

    try {
        await loadUserRoles();
        const user = await checkIsUserRegistered(auth, code);
        return user;
    } catch (err) {
        return new ErrorDTO(INTERNAL_SERVER_ERROR, 'Error while connecting to database (ApiController)');
    }

}

const getUser = async (username) => {
    try {

        return await User.findAll({
            where: { 
                username: username 
            }
        });

    } catch (err) {
        return new ErrorDTO(INTERNAL_SERVER_ERROR, err);
    }
}

const loadUserRoles = async () => {
    const roles = await RoleModel.findAll();
    if (roles.length === 0) {
        await RoleModel.bulkCreate([
            { name: 'User' },
            { name: 'Admin' }
        ])
    }
}

module.exports = {
    CheckUserRegistered,
    getUser,
}
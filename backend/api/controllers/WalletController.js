const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const WalletModel = require('./../models/Wallet');
const { filter } = require('lodash');


const WalletController = () => {

    getUserCurrent = async (req,res) => {
        try {
            const { userId } = req.body;
            
            const current = await WalletModel.findOne({where: {UserId: userId}});
            return res.status(OK).json({ current });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    return {
     getUserCurrent,
    }
}


module.exports = WalletController;
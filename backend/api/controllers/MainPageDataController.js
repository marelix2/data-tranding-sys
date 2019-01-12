const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const { filter } = require('lodash');
const FeedBackModel = require('./../models/Feedback');
const UserModel = require('./../models/User');
const TagModel = require('./../models/Tag');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');
const SoldDataModel = require('./../models/SoldData');
const BoughtDataModel = require('./../models/BoughtData');



const MainPageDataController = () => {

    getComments = async (req, res) => {
        try {

            let comments = await FeedBackModel.findAll();
            let user;
            for (let index = 0; index < comments.length; index++) {
                user = await UserModel.findById(comments[index].fk_user_id).then((u) => {
                    return {
                        username: u.username,
                        avatar: u.avatar
                    };
                });
                comments[index].dataValues.user = user;
            }


            return res.status(OK).json({ comments });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }
    getStatistics = async (req, res) => {
        try {

            let users = await UserModel.findAll();
            let emailsRecords = await EmailModel.findAll();
            let companyRecords = await CompanyModel.findAll();
            let tags = await TagModel.findAll();
            let soldTables = await SoldDataModel.findAll();
            let boughtTables = await BoughtDataModel.findAll();

            const statistics = {
                users: users.length,
                records: emailsRecords.length + companyRecords.length,
                tags: tags.length,
                soldTables: soldTables.length,
                boughtTables: boughtTables.length
            }
        
            return res.status(OK).json({ statistics });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    return {
        getComments,
        getStatistics
    }
}


module.exports = MainPageDataController;
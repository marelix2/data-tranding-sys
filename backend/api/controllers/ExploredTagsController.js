const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const UserModel = require('./../models/User');
const TagModel = require('./../models/Tag');
const ExploredTagModel = require('./../models/ExploredTag');
const { filter } = require('lodash');


const ExploredTagsController = () => {

    updateExploredTag = async (req, res) => {
        try {
            const { userId, path, name } = req.body;
            const user = await UserModel.findOne({where: {id: userId}});

            let exploredTag = await ExploredTagModel.findOne({where: { path: path }});
            const tag = await TagModel.findOne({ where: { name: name } });

            if(exploredTag !== null) {
                await exploredTag.update({ path: path, name: tag.title },{ fields: ['path','name'] });
            } else {
                exploredTag = await ExploredTagModel.create({ path: path, name: tag.title });
                await exploredTag.setUser(user);
            }

            return res.status(OK).json({ exploredTag});
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    getTagsForDisplay= async ( req, res) => {
        try {
            const { userId } = req.body;
            const exploredTag = await ExploredTagModel.findAll({ where: { UserId: userId }  , limit: 5 });
            
            return res.status(OK).json({ exploredTag });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }
    

    return {
        updateExploredTag,
        getTagsForDisplay
    }
}


module.exports = ExploredTagsController;
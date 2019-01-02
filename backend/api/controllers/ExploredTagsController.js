const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const UserModel = require('./../models/User');
const ExploredTagModel = require('./../models/ExploredTag');
const { filter } = require('lodash');


const ExploredTagsController = () => {

    updateExploredTag = async (req, res) => {
        try {
            const { userId, path, name } = req.body;
            const user = await UserModel.findOne({where: {id: userId}});

            let exploredTag = await ExploredTagModel.findOne({where: { path: path }});

            if(exploredTag !== null) {
                await exploredTag.update({ path: path },{ fields: ['path'] });
            } else {
                exploredTag = await ExploredTagModel.create({ path: path, name: name });
                await exploredTag.setUser(user);
            }

            return res.status(OK).json({ exploredTag });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    getTagsForDisplay= async ( req, res) => {
        try {
            const { userId } = req.body;
            const exploredTag = await ExploredTagModel.findAll({ where: { UserId: userId } }, { limit: 10 });
            
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
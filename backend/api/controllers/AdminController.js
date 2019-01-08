const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const { filter } = require('lodash');
const TagModel = require('./../models/Tag');
const CategoryModel = require('./../models/Category');
const TagValueModel = require('./../models/TagValue');

const AdminController = () => {

    getCategories = async (req, res) => {
        try {
        
            const categories = await CategoryModel.findAll();

            return res.status(OK).json({ categories });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    getTags = async (req,res) => {
        try {
            
            const {category} = req.body;
            const categoryId = category === 'emails' ? 1 : 2;

            let tags = await TagModel.findAll({where : { fk_category: categoryId }, include :[{model: TagValueModel}]});

            return res.status(OK).json({ tags });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    updateTagValue = async (req, res) => {
        try {

            const { dataValue, tagValueId } = req.body;

           let tagValue = await TagValueModel.findById(tagValueId);

            await tagValue.update({ value: dataValue }, { fields: ['value'] });
            
            return res.status(OK).json({ tagValue});
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    return {
        getCategories,
        getTags,
        updateTagValue
    }
}


module.exports = AdminController;
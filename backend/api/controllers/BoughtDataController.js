const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const BuyDataModel = require('./../models/BoughtData');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');
const TagModel = require('./../models/Tag');
const { filter } = require('lodash');


const BoughtDataController = () => {

  const getAllForDisplayEmails = async (req, res) => {
    try {
      const { userId, categoryId } = req.body;
      let tables = await BuyDataModel.findAll({ where: { fk_user_id: userId, CategoryId: categoryId } });
    
      for( let index = 0 ; index < tables.length ; index++){
        let emails = await EmailModel.findAll({
          include: [{
            model: BuyDataModel,
            through: {
              attributes: ['createdAt', 'fk_table_id'],
              where: { fk_table_id: tables[index].id }
            }
          }]
        })
        emails = filter(emails, (email) => email.BoughtData.length > 0)
        if(emails.length > 0){
          tables[index].dataValues.rows = emails.length;
        }else {
           tables.splice(index,1);
        }
      }

      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }

  }

  getAllForDisplayCompanies = async (req, res) => {
    try {
      
      const {userId, categoryId} = req.body;
      let tables = await BuyDataModel.findAll({ where: { fk_user_id: userId, CategoryId: categoryId} });

      for( let index = 0 ; index < tables.length ; index++){
        console.log(index);
        let companies = await CompanyModel.findAll({
          include: [{
            model: BuyDataModel,
            through: {
              attributes: ['createdAt', 'fk_table_id','name'],
              where: { fk_table_id: tables[index].id }
            }
          }]
        })
        companies = filter(companies, (companies) => companies.BoughtData.length > 0);
        if(companies.length > 0){
          tables[index].dataValues.rows = companies.length;
        }else {
           tables.splice(index,1);
        }
      }

      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  getNumberOfTables = async (req, res) => {
    try {

    const { userId } = req.body;

    let tables = await BuyDataModel.findAll({ where: { fk_user_id: userId} });

    tables = tables.map( (table) => {
      return {id: table.dataValues.id , categoryId: table.dataValues.CategoryId}
    })
    console.log(tables);
      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  return {
    getAllForDisplayEmails,
    getAllForDisplayCompanies,
    getNumberOfTables
  }
}


module.exports = BoughtDataController;
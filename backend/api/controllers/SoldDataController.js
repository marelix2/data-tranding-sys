const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const SoldDataModel = require('./../models/SoldData');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');
const ProgressEmailModel = require('./../models/ProgressEmail');
const ProgressCompanyModel = require('./../models/ProgressCompany');
const UserModel = require('./../models/User');

const SoldDataController = () => {

  const getAllForDisplay = async (req, res) => {
    try {
      const { userId, status } = req.body;

      let tables = await SoldDataModel.findAll({ where: { fk_user_id: userId, status: status } });

      const tablesId = tables.map((tab) => tab.id);

      for (let index = 0; index < tablesId.length; index++) {
        const emails = await EmailModel.findAll({ where: { fk_st_email_id: tablesId[index] } });
        if (emails.length) {
          tables[index].dataValues.rows = emails.length;
          tables[index].dataValues.category = 'Emaile';
        } else {
          const companies = await CompanyModel.findAll({ where: { fk_st_company_id: tablesId[index] } });
          tables[index].dataValues.rows = companies.length;
          tables[index].dataValues.category = 'Firmy';
        }
      }


      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const getInProgressForDisplay = async (req, res) => {
    try {
      const { status } = req.body;

      let tables = await SoldDataModel.findAll({
        where: { status: status }
      });

      const tablesId = tables.map((tab) => tab.id);

      for (let index = 0; index < tablesId.length; index++) {
        const emails = await ProgressEmailModel.findAll({ where: { fk_st_progress_email_id: tablesId[index] } });
        if (emails.length) {
          tables[index].dataValues.rows = emails.length;
          tables[index].dataValues.category = 'Emaile';
        } else {
          const companies = await ProgressCompanyModel.findAll({ where: { fk_st_progress_company_id: tablesId[index] } });
          tables[index].dataValues.rows = companies.length;
          tables[index].dataValues.category = 'Firmy';
        }
      }

      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const getUserInProgress = async (req, res) => {
    try {
      const { status, userId } = req.body;

      let tables = await SoldDataModel.findAll({
        where: { status: status, fk_user_id: userId}
      });
      const tablesId = tables.map((tab) => tab.id);

      for (let index = 0; index < tablesId.length; index++) {
        const emails = await ProgressEmailModel.findAll({ where: { fk_st_progress_email_id: tablesId[index] } });
        if (emails.length) {
          tables[index].dataValues.rows = emails.length;
          tables[index].dataValues.category = 'Emaile';
        } else {
          const companies = await ProgressCompanyModel.findAll({ where: { fk_st_progress_company_id: tablesId[index] } });
          tables[index].dataValues.rows = companies.length;
          tables[index].dataValues.category = 'Firmy';
        }
      }

      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const getTransactionData = async (req,res) => {
    try {
      const {id} = req.body;
      let type = 'emails'
      let rows = await ProgressEmailModel.findAll({ where: { fk_st_progress_email_id: id } });

      if(rows.length === 0) {
        type = 'companies'
        rows = await ProgressCompanyModel.findAll({ where: { fk_st_progress_company_id: id} });
      } 
      
      return res.status(OK).json({ rows, type });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const DeleteRecord = async (req,res) => {
   

    try {
      const { rowId, category } = req.body;
      let row;

      switch(category){
        case 'emails': 
          row = await ProgressEmailModel.findById(rowId).then(async(row) => await row.destroy());
        break;
        case 'companies':
          row = await ProgressCompanyModel.findById(rowId).then(async (row) => await row.destroy());
        break;
      }
      return res.status(OK).json({ row });
     
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }


  const DeleteTable = async (req,res) => {
   
    try {
      const { id , category } = req.body;

      switch(category) {

        case 'emails': 
        await ProgressEmailModel.findAll({where: {fk_st_progress_email_id: id}}).then(async(emails) => {
          emails.map(async (email) => await email.destroy())
        });
        break;

        case 'companies': 
        await ProgressCompanyModel.findAll({where: {fk_st_progress_company_id: id}}).then(async(companies) => {
          companies.map(async (company) => await company.destroy())
        });
        break;
      }
      
      const table = await SoldDataModel.findById(id).then( async( table) => {
        await table.destroy();
      })

      return res.status(OK).json({ table });
     
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const AcceptTable = async (req, res) => {
    try {
      const { id , category } = req.body;

      switch(category) {

        case 'emails': 
      ;
        break;

        case 'companies': 
        
        break;
      }
      
      const table = await SoldDataModel.findById(id);

      return res.status(OK).json({ table });
     
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }
  

  return {
    getAllForDisplay,
    getInProgressForDisplay,
    getUserInProgress,
    getTransactionData,
    DeleteRecord,
    DeleteTable,
    AcceptTable
  }
}


module.exports = SoldDataController;
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const SoldDataModel = require('./../models/SoldData');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');

const SoldDataController = () => {

  const getAllForDisplay = async (req, res) => {
    try {
      const { userId } = req.body;

      let tables = await SoldDataModel.findAll({ where: { fk_user_id: userId } });

      const tablesId = tables.map((tab) => tab.id);

      for( let index = 0 ; index < tablesId.length ; index++){
        const emails = await EmailModel.findAll({ where: { fk_st_email_id: tablesId[index] } });
        if (emails.length) {
          tables[index].dataValues.rows = emails.length;
          tables[index].dataValues.category = 'Emaile';
        }  else {
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

  return {
    getAllForDisplay
  }
}


module.exports = SoldDataController;
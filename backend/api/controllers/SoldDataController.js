const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const SoldDataModel = require('./../models/SoldData');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');
const ProgressEmailModel = require('./../models/ProgressEmail');
const ProgressCompanyModel = require('./../models/ProgressCompany');
const UserModel = require('./../models/User');
const TagModel = require('./../models/Tag');
const uniqid = require('uniqid');
const WalletModel = require('./../models/Wallet');
const TagValueModel = require('./../models/TagValue');
const {filter} = require('lodash');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

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
        where: { status: status, fk_user_id: userId }
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

  const getTransactionData = async (req, res) => {
    try {
      const { id } = req.body;
      let type = 'emails'
      let rows = await ProgressEmailModel.findAll({ where: { fk_st_progress_email_id: id } });

      if (rows.length === 0) {
        type = 'companies'
        rows = await ProgressCompanyModel.findAll({ where: { fk_st_progress_company_id: id } });
      }

      return res.status(OK).json({ rows, type });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const DeleteRecord = async (req, res) => {


    try {
      const { rowId, category } = req.body;
      let row;

      switch (category) {
        case 'emails':
          row = await ProgressEmailModel.findById(rowId).then(async (row) => await row.destroy());
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


  const DeleteTable = async (req, res) => {

    try {
      const { id, category } = req.body;

      switch (category) {

        case 'emails':
          await ProgressEmailModel.findAll({ where: { fk_st_progress_email_id: id } }).then(async (emails) => {
            emails.map(async (email) => await email.destroy())
          });
          break;

        case 'companies':
          await ProgressCompanyModel.findAll({ where: { fk_st_progress_company_id: id } }).then(async (companies) => {
            companies.map(async (company) => await company.destroy())
          });
          break;
      }

      const table = await SoldDataModel.findById(id).then(async (table) => {
        await table.destroy();
      })

      return res.status(OK).json({ table });

    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const AcceptTable = async (req, res) => {
    try {
      const { id, category } = req.body;
      const table = await SoldDataModel.findById(id);
      let tagId;
      let tags;
      let wallet;
      let tagValue;
      let walletState;

      switch (category) {
        case 'emails':

          let emailsData;
          await ProgressEmailModel.findAll({ where: { fk_st_progress_email_id: id }, include: [{ model: TagModel }] }).then((response) => {
            tagId = response[0].Tags[0].id;
            emailsData = response.map((res) => { return { name: res.name } })
            response.map((res) => res.destroy())
          })

          await table.update({ status: 'completed' }, { fields: ['status'] });

          const emails = await EmailModel.bulkCreate(emailsData);

          tags = await TagModel.findById(tagId);
          emails.map(async (email) => {
            await email.addTags(tags);
            await table.addEmail(email);
          })

          wallet = await WalletModel.findOne({ where: { UserId: table.fk_user_id } });
          tagValue = await TagValueModel.findById(tags.fk_value);
          walletState = wallet.currentState;

          await wallet.update({ currentState: walletState + tagValue.value * emails.length }, { fields: ['currentState'] });

          break;

        case 'companies':
          let companyData;
          await ProgressCompanyModel.findAll({ where: { fk_st_progress_company_id: id }, include: [{ model: TagModel }] }).then((response) => {
            tagId = response[0].Tags[0].id;
            companyData = response.map((res) => {
              return {
                name: res.name,
                description: res.description,
                contactNumber: res.contactNumber,
                locationCity: res.locationCity,
                address: res.address,
                zipCode: res.zipCode,
                country: res.country,
                website: res.website,
                province: res.province
              }
            })
            response.map((res) => res.destroy())
          })

          await table.update({ status: 'completed' }, { fields: ['status'] });

          const companies = await CompanyModel.bulkCreate(companyData);

          tags = await TagModel.findById(tagId);
          companies.map(async (company) => {
            await company.addTags(tags);
            await table.addCompany(company);
          });

          wallet = await WalletModel.findOne({ where: { UserId: table.fk_user_id } });
          tagValue = await TagValueModel.findById(tags.fk_value);
          walletState = wallet.currentState;

          await wallet.update({ currentState: walletState + tagValue.value * emails.length }, { fields: ['currentState'] });

          break;
      }

      return res.status(OK).json({ table });

    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  const CreateInProgressTable = async (req, res) => {
    try {
      const { userId, category, data, tag } = req.body;
      const user = await UserModel.findById(userId);
      let emailsAddr;
      let companiesData;

      switch (category) {
        case 'emails':
          emailsAddr = data.map(rows => {
            return { name: rows[1].value }
          });

          await SoldDataModel.create({
            name: `${uniqid()}`,
            status: 'progress'
          }).then(async (soldData) => {
            await user.addSoldData(soldData);

            const emails = await ProgressEmailModel.bulkCreate(emailsAddr);
            const tags = await TagModel.findOne({ where: { fk_category: 1, title: tag } });
            emails.map(async (email) => {
              await email.addTags(tags);
              await soldData.setProgressEmail(email);
            })
          })
          break;

        case 'companies':
          companiesData = data.map((rows) => {
            return {
              name: rows[1].value,
              description: rows[3].value,
              contactNumber: rows[4].value,
              locationCity: rows[5].value,
              address: rows[6].value,
              zipCode: rows[7].value,
              country: rows[8].value,
              website: rows[9].value,
              province: rows[10].value
            }
          })

          await SoldDataModel.create({
            name: `${uniqid()}`,
            status: 'progress'
          }).then(async (soldData) => {
            await user.addSoldData(soldData);

            const companies = await ProgressCompanyModel.bulkCreate(companiesData);
            const tags = await TagModel.findOne({ where: { fk_category: 2, title: tag } });
            companies.map(async (company) => {
              await company.addTags(tags);
              await soldData.setProgressCompany(company);
            })
          })

          break;
      }
      return res.status(OK).json({ userId, category, emailsAddr, companiesData, tag });



    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }


  downloadTable = async (req, res) => {
    try {
      const { tableName } = req.query;
      const filePath = 'db/files/soldDatafile.csv';
      const table = await SoldDataModel.findOne({ where: { name: tableName } });

     
        const tmp = await EmailModel.findAll({ where: { fk_st_email_id: table.id } });
      const category = tmp.length ? 1 : 2;

      let csvWriter;
      let tag;
      let dataToWrite;
      switch (category) {

        case 1:
          csvWriter = createCsvWriter({
            path: filePath,
            header: [
              { id: 'name', title: 'name' },
              { id: 'tag', title: 'tag' }
            ]
          });

          let emails = await EmailModel.findAll({
            where: {fk_st_email_id: table.id}
          })
          
          let ee = await await EmailModel.findAll({
            include: [{
              model: TagModel
            }]
          })
          ee = filter(ee, (e) => e.id === emails[0].id);
          tag = await TagModel.findById(ee[0].Tags[0].id);

          dataToWrite = emails.map((email) => {
            return { name: email.name, tag: tag.title }
          })

          await csvWriter.writeRecords(dataToWrite);

          res.setHeader("Content-Type", "text/csv");
          return res.status(OK).download(filePath, 'file.csv');
          break;

        case 2:

          csvWriter = createCsvWriter({
            path: filePath,
            header: [
              { id: 'name', title: 'name' },
              { id: 'description', title: 'description' },
              { id: 'contactNumber', title: 'contactNumber' },
              { id: 'locationCity', title: 'locationCity' },
              { id: 'address', title: 'address' },
              { id: 'zipCode', title: 'zipCode' },
              { id: 'country', title: 'country' },
              { id: 'website', title: 'website' },
              { id: 'province', title: 'province' },
              { id: 'tag', title: 'tag' }
            ]
          });

          let companies = await CompanyModel.findAll({
            where: { fk_st_company_id: table.id }
          })
          let cc = await await CompanyModel.findAll({
            include: [{
              model: TagModel
            }]
          })
          cc = filter(cc, (c) => c.id === companies[0].id);
          tag = await TagModel.findById(cc[0].Tags[0].id);

          dataToWrite = companies.map((company) => {
            return {
              name: company.name,
              description: company.description,
              contactNumber: company.contactNumber,
              locationCity: company.locationCity,
              address: company.address,
              zipCode: company.zipCode,
              country: company.country,
              website: company.website,
              province: company.province,
              tag: tag.title
            }
          })

          await csvWriter.writeRecords(dataToWrite);

          res.setHeader("Content-Type", "text/csv");
          return res.status(OK).download(filePath, 'file.csv');

          break;
      }


      return res.status(OK).json({});
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
    AcceptTable,
    CreateInProgressTable,
    downloadTable
  }
}


module.exports = SoldDataController;
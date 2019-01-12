const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const BuyDataModel = require('./../models/BoughtData');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');
const TagModel = require('./../models/Tag');
const { filter } = require('lodash');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const BoughtDataController = () => {

  const getAllForDisplayEmails = async (req, res) => {
    try {
      const { userId, categoryId } = req.body;
      let tables = await BuyDataModel.findAll({ where: { fk_user_id: userId, CategoryId: categoryId, status: 'completed' } });

      for (let index = 0; index < tables.length; index++) {
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
        if (emails.length > 0) {
          tables[index].dataValues.rows = emails.length;
        } else {
          tables.splice(index, 1);
        }
      }

      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }

  }

  getAllForDisplayCompanies = async (req, res) => {
    try {

      const { userId, categoryId } = req.body;
      let tables = await BuyDataModel.findAll({ where: { fk_user_id: userId, CategoryId: categoryId, status: 'completed' } });

      for (let index = 0; index < tables.length; index++) {
        let companies = await CompanyModel.findAll({
          include: [{
            model: BuyDataModel,
            through: {
              attributes: ['createdAt', 'fk_table_id', 'name'],
              where: { fk_table_id: tables[index].id }
            }
          }]
        })
        companies = filter(companies, (companies) => companies.BoughtData.length > 0);
        if (companies.length > 0) {
          tables[index].dataValues.rows = companies.length;
        } else {
          tables.splice(index, 1);
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

      let tables = await BuyDataModel.findAll({ where: { fk_user_id: userId, status: 'completed' } });

      tables = tables.map((table) => {
        return { id: table.dataValues.id, categoryId: table.dataValues.CategoryId }
      })
      return res.status(OK).json({ tables });
    } catch (error) {
      return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
    }
  }

  downloadTable = async (req, res) => {
    try {
      const { tableName } = req.query;
      const filePath = 'db/files/boughtDatafile.csv';
      const table = await BuyDataModel.findOne({ where: { name: tableName } });

      let csvWriter;
      let tag;
      let dataToWrite;
      switch (table.CategoryId) {

        case 1:
          csvWriter = createCsvWriter({
            path: filePath,
            header: [
              { id: 'name', title: 'name' },
              { id: 'tag', title: 'tag' }
            ]
          });

          let emails = await EmailModel.findAll({
            include: [{
              model: BuyDataModel
            }]
          })
          emails = filter(emails, (email) => email.BoughtData.length > 0)
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
            include: [{
              model: BuyDataModel
            }]
          })
          companies = filter(companies, (company) => company.BoughtData.length > 0)
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
    getAllForDisplayEmails,
    getAllForDisplayCompanies,
    getNumberOfTables,
    downloadTable
  }
}


module.exports = BoughtDataController;
const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const TagModel = require('./../models/Tag');
const BoughtDataModel = require('./../models/BoughtData');
const { filter, uniqBy } = require('lodash');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');
const UserModel = require('./../models/User');
const CategoryModel = require('./../models/Category');
const TagValueModel = require('./../models/TagValue');


const BuyDataController = () => {

    addTableToCart = async (req, res) => {
        try {
            const { title, userId } = req.body;
            const message = 'Posiadasz juz te dane!';

            const tag = await TagModel.findOne({ where: { title: title } });

            if (tag.fk_category === 1) {
                const emails = await EmailModel.findAll({ include: [{ model: BoughtDataModel }] }).then((emails) => {
                    let em = filter(emails, (email) => {
                        return email.BoughtData.length !== 0 && email.BoughtData[0].fk_user_id === parseInt(userId);
                    })
                    return em;
                });

                let tagId = [];
                for (let i = 0; i < emails.length; i++) {
                    let cm = await EmailModel.findAll({ where: { id: emails[i].id }, include: [{ model: TagModel }] });
                    tagId.push(cm[0].Tags[0].id);
                }

                if (!tagId.includes(tag.id)) {

                    const table = await BoughtDataModel.create({
                        name: `${tag.name}_${userId}_boughtData`,
                        status: 'progress'
                    }).then(async (boughtData) => {
                        const category = await CategoryModel.findOne({ where: { name: 'Emails' } });
                        await boughtData.setCategory(category);
                        const user = await UserModel.findById(userId);
                        await user.addBoughtData(boughtData);
                        let emails = await EmailModel.findAll({
                            include: [
                                { model: TagModel, required: true }
                            ]
                        });
                        emails = filter(emails, (email) => {
                            let tags = filter(email.Tags, (t) => { return t.id === tag.id });
                            return tags.length !== 0;
                        });
                        await emails.map(async (email) => await email.addBoughtData(boughtData));
                    });

                    return res.status(OK).json({ tag, table });
                } else {

                    return res.status(OK).json({ message });
                }

            }
            else if (tag.fk_category === 2) {
                const companies = await CompanyModel.findAll({ include: [{ model: BoughtDataModel }] }).then((companies) => {
                    
                    let cm = filter(companies, (company) => {
                        console.log("\n\n\n user id", userId === 1, "\n\n\n");
                        return company.BoughtData.length !== 0 && company.BoughtData[0].fk_user_id === parseInt(userId);
                    })
                    console.log(cm);
                    return cm;
                });
                let tagId = [];
                for (let i = 0; i < companies.length; i++) {
                    let cm = await CompanyModel.findAll({ where: { id: companies[i].id }, include: [{ model: TagModel }] });
                    tagId.push(cm[0].Tags[0].id);
                }
                console.log(tagId.includes(tag.id), tagId);
                if (!tagId.includes(tag.id)) {
                    
                   const table = await BoughtDataModel.create({
                        name: `${tag.name}_${userId}_boughtData`,
                        status: 'progress'
                    }).then(async (boughtData) => {
                        const category = await CategoryModel.findOne({ where: { name: 'Companies' } });
                        await boughtData.setCategory(category);
                        const user = await UserModel.findById(userId);
                        await user.addBoughtData(boughtData);
                        let companies = await CompanyModel.findAll({
                            include: [
                                { model: TagModel, required: true }
                            ]
                        });
                        companies = filter(companies, (company) => {
                            let tags = filter(company.Tags, (t) => { return t.id === tag.id });
                            return tags.length !== 0;
                        });
                        await companies.map(async (company) => await company.addBoughtData(boughtData));
                    });

                    return res.status(OK).json({ tag, table });
                }else {
                    return res.status(OK).json({ message });
                }
                
            }


        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    const getAllInProgressEmails = async (req, res) => {
        try {
            const { userId, categoryId } = req.body;
            let tables = await BoughtDataModel.findAll({ where: { fk_user_id: userId, CategoryId: 1, status: 'progress' } });
            let tableValue = null;

            for (let index = 0; index < tables.length; index++) {
                let emails = await EmailModel.findAll({
                    include: [{
                        model: BoughtDataModel,
                        through: {
                            attributes: ['createdAt', 'fk_table_id'],
                            where: { fk_table_id: tables[index].id }
                        }
                    }]
                })
                let tagValueId = await EmailModel.findAll({
                    include: [{ model: TagModel}],
                    where: {id: emails[0].id}
                });
                tagValueId = tagValueId[0].Tags[0].fk_value;

                 tableValue = await TagValueModel.findById(tagValueId);


                emails = filter(emails, (email) => email.BoughtData.length > 0)
                if (emails.length > 0) {
                    tables[index].dataValues.rows = emails.length;
                } else {
                    tables.splice(index, 1);
                }
            }

            return res.status(OK).json({ tables ,tableValue});
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }

    }

    getAllInProgressCompanies = async (req, res) => {
        try {

            const { userId, categoryId } = req.body;
            let tables = await BoughtDataModel.findAll({ where: { fk_user_id: userId, CategoryId: 2, status: 'progress' } });
            let tableValue = null;

            for (let index = 0; index < tables.length; index++) {
                let companies = await CompanyModel.findAll({
                    include: [{
                        model: BoughtDataModel,
                        through: {
                            attributes: ['createdAt', 'fk_table_id', 'name'],
                            where: { fk_table_id: tables[index].id }
                        }
                    }]
                })

                let tagValueId = await CompanyModel.findAll({
                    include: [{ model: TagModel}],
                    where: {id: companies[0].id}
                });
                tagValueId = tagValueId[0].Tags[0].fk_value;

                 tableValue = await TagValueModel.findById(tagValueId);

                companies = filter(companies, (companies) => companies.BoughtData.length > 0);
                if (companies.length > 0) {
                    tables[index].dataValues.rows = companies.length;
                } else {
                    tables.splice(index, 1);
                }
            }

            return res.status(OK).json({ tables, tableValue });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    deleteInProgressTables = async (req,res) => {
        try {

            const { userId} = req.body;
            let tables = await BoughtDataModel.findAll({ where: { fk_user_id: userId, status: 'progress' } }).then(async (tables) => {
                 tables.map(async (table) => await table.destroy());
            });
            return res.status(OK).json({ tables });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    transactionTableConfirmed = async (req,res) => {
        try {

            const { userId } = req.body;
            let tables = await BoughtDataModel.findAll({ where: { fk_user_id: userId, status: 'progress' } }).then(async (tables) => {
                tables.map(async (table) => await table.update({status: 'completed'}, {fields: ['status']}));
            });
            return res.status(OK).json({ tables });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    return {
        addTableToCart,
        getAllInProgressEmails,
        getAllInProgressCompanies,
        deleteInProgressTables,
        transactionTableConfirmed
    }
}


module.exports = BuyDataController;
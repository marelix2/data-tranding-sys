const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR, UNPROCESSABLE_ENTITY } = require('http-status-codes');
const ErrorDTO = require('./../dto/ErrorDTO.js');
const TagModel = require('./../models/Tag');
const EmailModel = require('./../models/Email');
const CompanyModel = require('./../models/Company');
const DescriptionModel = require('./../models/Description');
const { filter, takeRight, uniqBy } = require('lodash');


const ExploredController = () => {

    getEmailTagsForDisplay = async (req, res) => {
        try {
            let emailTags = await TagModel.findAll({ where: { fk_category: 1 } });
            const emails = await EmailModel.findAll({
                include: [{
                    model: TagModel
                }]
            })
            for (let index = 0; index < emailTags.length; index++) {
                let filteredEmails = filter(emails, (email) => {
                    return email.dataValues.Tags[0].id === emailTags[index].dataValues.id;
                })
                emailTags[index].dataValues.rows = filteredEmails.length;
            }

            return res.status(OK).json({ emailTags });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    getCompaniesTagsForDisplay = async (req, res) => {
        try {
            const companyTags = await TagModel.findAll({ where: { fk_category: 2 } });
            const companies = await CompanyModel.findAll({
                include: [{
                    model: TagModel
                }]
            })

            for (let index = 0; index < companyTags.length; index++) {
                let filteredEmails = filter(companies, (company) => {
                    return company.dataValues.Tags[0].id === companyTags[index].dataValues.id;
                })
                companyTags[index].dataValues.rows = filteredEmails.length;
            }

            return res.status(OK).json({ companyTags });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    getExampleDataForDisplay = async (req, res) => {
        try {
            const { name, category } = req.body;

            const chosenTag = await TagModel.findOne({ where: { title: name } });
            let data;

            switch (category) {
                case 'companies':
                    data = await CompanyModel.findAll({
                        include: [{
                            model: TagModel
                        }]
                    });

                    data = filter(data, (d) => {
                        return d.Tags[0].id === chosenTag.id;
                    })
                    data = takeRight(data, 5);
                    break;
                case 'email':
                    data = await EmailModel.findAll({
                        include: [{
                            model: TagModel,
                        }]
                    })

                    data = filter(data, (d) => {
                        return d.Tags[0].id === chosenTag.id;
                    })

                    data = takeRight(data, 5);
                    break;

                default:
                    return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
                    break;
            }
            return res.status(OK).json({ data });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    getTagProvincesForDisplay = async (req, res) => {
        try {
            const { name } = req.body;

            const chosenTag = await TagModel.findOne({ where: { title: name } });
            let data;

            data = await CompanyModel.findAll({
                include: [{
                    model: TagModel
                }]
            });

            data = filter(data, (d) => {
                return d.Tags[0].id === chosenTag.id;
            })
            data = uniqBy(data, (d) => d.province);
            data = data.map((d) => d.province)
           


            return res.status(OK).json({ data });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    getTagDescription = async (req, res) => {
        try {
            const { name } = req.body;

            let tag = await TagModel.findOne({
                where: { title: name },
                 include: [{
                    model: DescriptionModel
                }] });
                console.log(tag);

           const desc = tag.Description.description;
        

            
            return res.status(OK).json({ desc });
        } catch (error) {
            return res.status(BAD_REQUEST).json(new ErrorDTO(BAD_REQUEST, `something went wrong: ${error}`));
        }
    }

    return {
        getEmailTagsForDisplay,
        getCompaniesTagsForDisplay,
        getExampleDataForDisplay,
        getTagProvincesForDisplay,
        getTagDescription
    }
}


module.exports = ExploredController;
const { STRING } = require('sequelize');
const BoughtData = require('./BoughtData');
const Tag = require('./Tag');
const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'Company';

const Company = sequelize.define('Company', {
    name: {
        type: STRING
    },
    description : {
        type: STRING
    },
    contactNumber: {
        type: STRING
    },
    locationCity: {
        type: STRING
    },
    address: {
        type: STRING
    },
    zipCode: {
        type: STRING
    },
    country: {
        type: STRING
    },
    website: {
        type: STRING
    },
    province: {
        type: STRING
    }
}, { hooks, tableName });

Company.belongsToMany(BoughtData, { through: 'CompanyRowStatus', foreginKey: 'fk_company_id', otherKey: 'fk_table_id' });
Company.belongsToMany(Tag, { through: 'CompanyTag', foreginKey: 'fk_tag_id', otherKey: 'fk_company_id' });

// eslint-disable-next-line
Company.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Company;
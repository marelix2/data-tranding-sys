const { STRING } = require('sequelize');
const RowStatus= require('./RowStatus');
const Tag = require('./Tag');
const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'Company';

const Company = sequelize.define('Company', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });

Company.hasMany(RowStatus, { as: 'RowStatus', foreignKey: 'fk_data_id' });
Company.belongsToMany(Tag, { through: 'CompanyTag', foreginKey: 'fk_tag_id', otherKey: 'fk_company_id' });

// eslint-disable-next-line
Company.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Company;
const { STRING } = require('sequelize');
const Email = require('./Email');
const Company = require('./Company');
const ProgressCompany = require('./ProgressCompany');
const ProgressEmail = require('./ProgressEmail');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'SoldData';

const SoldData = sequelize.define('SoldData', {
    name: {
        type: STRING,
        unique: true,
    }, 
    status: {
        type: STRING
    }
}, { hooks, tableName });

SoldData.hasMany(Company, { as: 'Company', foreignKey: 'fk_st_company_id' });
SoldData.hasMany(Email, { as: 'Email', foreignKey: 'fk_st_email_id' });
SoldData.hasMany(ProgressEmail, { as: 'ProgressEmail', foreignKey: 'fk_st_progress_email_id' });
SoldData.hasMany(ProgressCompany, { as: 'ProgressCompany', foreignKey: 'fk_st_progress_company_id' });

// eslint-disable-next-line
SoldData.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = SoldData;
const { STRING } = require('sequelize');
const Email = require('./Email');
const Company = require('./Company');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'SoldData';

const SoldData = sequelize.define('SoldData', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });

SoldData.hasMany(Company, { as: 'Company', foreignKey: 'fk_company_id' });
SoldData.hasMany(Email, { as: 'Email', foreignKey: 'fk_email_id' });


// eslint-disable-next-line
SoldData.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = SoldData;
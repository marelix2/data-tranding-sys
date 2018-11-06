const { STRING } = require('sequelize');
const RowStatus= require('./RowSatus');

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

Company.hasMany(RowStatus, { as: 'RowStatus', foreignKey: 'fk_row_status_id' });

// eslint-disable-next-line
Company.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Company;
const { STRING } = require('sequelize');
const RowStatus = require('./RowSatus');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'BoughtData';

const BoughtData = sequelize.define('BoughtData', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });

BoughtData.hasMany(RowStatus, { as: 'RowStatus', foreignKey: 'fk_row_status_id' });

// eslint-disable-next-line
BoughtData.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = BoughtData;
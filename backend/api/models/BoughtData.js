const { STRING } = require('sequelize');
const RowStatus = require('./RowStatus');

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

// eslint-disable-next-line
BoughtData.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = BoughtData;
const { INTEGER, STRING } = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'RowStatus';

const RowStatus = sequelize.define('RowStatus', {
    name: {
        type: STRING
    },
   
}, { hooks, tableName });

// eslint-disable-next-line
RowStatus.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    return values;
};

module.exports = RowStatus;
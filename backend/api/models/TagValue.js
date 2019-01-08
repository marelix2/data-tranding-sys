const { DOUBLE } = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {};

const tableName = 'TagValue';

const TagValue = sequelize.define('TagValue', {
    value: {
        type: DOUBLE
    },
  
}, { hooks, tableName });

TagValue.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = TagValue;
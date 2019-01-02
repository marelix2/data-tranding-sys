const { STRING } = require('sequelize');

const sequelize = require('../../config/database');
const User = require('./User');

const hooks = {};

const tableName = 'ExploredTag';

const ExploredTag = sequelize.define('ExploredTag', {
    path: {
        type: STRING
    },
    name: {
        type: STRING
    }

}, { hooks, tableName });

ExploredTag.belongsTo(User);

ExploredTag.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = ExploredTag;
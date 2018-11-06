const { STRING } = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'Roles';

const Role = sequelize.define('Role', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });

// eslint-disable-next-line
Role.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    return values;
};

module.exports = Role;
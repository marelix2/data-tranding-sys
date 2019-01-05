const { STRING } = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {};

const tableName = 'Descriptions';

const Description = sequelize.define('Description', {
    description: {
        type: STRING
    },
 
}, { hooks, tableName });



Description.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Description;

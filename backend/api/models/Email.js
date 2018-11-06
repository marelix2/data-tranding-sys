const { STRING } = require('sequelize');
const RowStatus = require('./RowSatus');
const SoldData = require('./SoldData');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'Email';

const Email = sequelize.define('Email', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });

Email.hasMany(RowStatus, { as: 'RowStatus', foreignKey: 'fk_data_id' });
//Email.belongsTo(SoldData);

// eslint-disable-next-line
Email.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Email;
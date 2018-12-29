const { STRING } = require('sequelize');
const RowStatus = require('./RowStatus');
const Tag = require('./Tag');

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
Email.belongsToMany(Tag, { through: 'EmailTag', foreginKey: 'fk_tag_id', otherKey: 'fk_email_id' });

Email.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Email;
const { STRING } = require('sequelize');
const BoughtData = require('./BoughtData');
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

Email.belongsToMany(BoughtData, { through: 'EmailRowStatus', foreginKey: 'fk_email_id', otherKey: 'fk_table_id' });
Email.belongsToMany(Tag, { through: 'EmailTag', foreginKey: 'fk_tag_id', otherKey: 'fk_email_id' });

Email.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Email;
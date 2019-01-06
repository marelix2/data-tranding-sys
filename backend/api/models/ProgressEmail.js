const { STRING } = require('sequelize');
const BoughtData = require('./BoughtData');
const Tag = require('./Tag');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'ProgressEmail';

const ProgressEmail = sequelize.define('ProgressEmail', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });

ProgressEmail.belongsToMany(Tag, { through: 'ProgressEmailTag', foreginKey: 'fk_tag_id', otherKey: 'fk_progress_email_id' });

ProgressEmail.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = ProgressEmail;
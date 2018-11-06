const { STRING } = require('sequelize');

const sequelize = require('../../config/database');

const Category = require('./Category');

const hooks = {};

const tableName = 'Tags';

const Tag = sequelize.define('Tag', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });

Tag.belongsTo(Category, { foreignKey: 'fk_category', foreignKeyConstraint: true });

Tag.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Tag;
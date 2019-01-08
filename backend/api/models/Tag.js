const { STRING } = require('sequelize');

const sequelize = require('../../config/database');
const Category = require('./Category');
const Description = require('./Description');
const TagValue = require('./TagValue');

const hooks = {};

const tableName = 'Tags';

const Tag = sequelize.define('Tag', {
    name: {
        type: STRING,
        unique: true,
    },
    title: {
        type: STRING
    },
    img: {
        type: STRING,
    }

}, { hooks, tableName });

Tag.belongsTo(Category, { foreignKey: 'fk_category', foreignKeyConstraint: true });
Tag.belongsTo(Description, { foreignKey: 'fk_description', foreignKeyConstraint: true });
Tag.belongsTo(TagValue, { foreignKey: 'fk_value', foreignKeyConstraint: true });

Tag.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Tag;

const { STRING } = require('sequelize');

const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'Category';

const Category = sequelize.define('Category', {
    name: {
        type: STRING,
        unique: true,
    }
}, { hooks, tableName });


// eslint-disable-next-line
Category.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Category;

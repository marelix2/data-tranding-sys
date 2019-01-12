const { STRING } = require('sequelize');
const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'Feedback';

const Feedback = sequelize.define('Feedback', {
    description: {
        type: STRING
    }
    
}, { hooks, tableName });

// eslint-disable-next-line
Feedback.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Feedback;
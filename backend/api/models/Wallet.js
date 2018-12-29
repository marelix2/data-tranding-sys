const { STRING, DOUBLE } = require('sequelize');
const User = require('./User');

const sequelize = require('../../config/database');


const hooks = {

};

const tableName = 'Wallets';

const Wallet = sequelize.define('Wallet', {
    name: {
        type: STRING,
        unique: true,
    },
    currentState: {
        type: DOUBLE  
    }
}, { hooks, tableName });

Wallet.belongsTo(User);

// eslint-disable-next-line
Wallet.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = Wallet;
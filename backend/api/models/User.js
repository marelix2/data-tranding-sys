const { STRING, DATE } = require('sequelize');
const BoughtData = require('./BoughtData');
const SoldData = require('./SoldData');

const sequelize = require('../../config/database');

const Role = require('./Role');

const hooks = {
};

const tableName = 'Users';

const User = sequelize.define('User', {
  username: {
    type: STRING,
    unique: true,
  },
  name: {
    type: STRING,
  },
  surname: {
    type: STRING,
  },
  register_date: {
    type: DATE
  },
  last_login_date: {
    type: DATE
  }
}, { hooks, tableName });

User.belongsToMany(Role, { through: 'UsersRoles' });
User.hasMany(BoughtData, { as: 'BoughtData', foreignKey: 'fk_user_id' });
User.hasMany(SoldData, { as: 'SoldData', foreignKey: 'fk_user_id' });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;
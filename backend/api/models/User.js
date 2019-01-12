const { STRING, DATE, INTEGER } = require('sequelize');
const BoughtData = require('./BoughtData');
const SoldData = require('./SoldData');
const Feedback = require('./Feedback');

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
  googleId: {
    type: STRING,
    unique: true,
  },
  email: {
    type: STRING,
    unique: true,
  },
  avatar: {
    type: STRING,
  }
}, { hooks, tableName });

User.belongsToMany(Role, { through: 'UsersRoles', foreignKey: 'fk_user_id', otherKey: 'fk_role_id'  });
User.hasMany(BoughtData, { as: 'BoughtData', foreignKey: 'fk_user_id' });
User.hasMany(SoldData, { as: 'SoldData', foreignKey: 'fk_user_id' });
User.hasMany(Feedback, { as: 'Feedback', foreignKey: 'fk_user_id' });


// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;
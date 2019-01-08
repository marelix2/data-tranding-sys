const { STRING } = require('sequelize');
const Tag = require('./Tag');
const sequelize = require('../../config/database');

const hooks = {

};

const tableName = 'ProgressCompany';

const ProgressCompany = sequelize.define('ProgressCompany', {
    name: {
        type: STRING
    },
    description: {
        type: STRING
    },
    contactNumber: {
        type: STRING
    },
    locationCity: {
        type: STRING
    },
    address: {
        type: STRING
    },
    zipCode: {
        type: STRING
    },
    country: {
        type: STRING
    },
    website: {
        type: STRING
    },
    province: {
        type: STRING
    }
}, { hooks, tableName });

ProgressCompany.belongsToMany(Tag, { through: 'ProgressCompanyTag', foreginKey: 'fk_tag_id', otherKey: 'fk_progress_company_id' });


// eslint-disable-next-line
ProgressCompany.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
};

module.exports = ProgressCompany;
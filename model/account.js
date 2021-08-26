const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/mariadb')
const bcrypt = require('bcrypt');

class Account extends Model {}

Account.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'account' });

Account.addHook('beforeCreate', async (account, options) => {
    if (account.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        account.password = bcrypt.hashSync(account.password, salt);
    }
});
Account.addHook('beforeUpdate', async (account, options) => {
    if (options.fields.includes("password")) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        account.password = bcrypt.hashSync(account.password, salt);
    }
});

module.exports = Account;
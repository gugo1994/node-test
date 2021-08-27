const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/mariadb')
const bcrypt = require('bcrypt');

class Account extends Model {}

Account.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Must be a valid email address",
            }
        }
    },
    avatar: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8],
                msg: "The password length should be minimum 8 characters."
            }
        },
    }

}, { sequelize, modelName: 'account' ,  indexes: [{
        fields: ['email'],
        unique: true
    }]
    ,});

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
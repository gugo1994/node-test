  const { table, host, user, pass } = require('../config/db.js').maria_db
  const { Sequelize } = require('sequelize');

  const sequelize = new Sequelize(table, user, pass, {
    host: host,
    dialect:'mariadb'
  });

module.exports = sequelize;
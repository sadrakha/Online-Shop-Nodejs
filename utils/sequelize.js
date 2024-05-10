const Sequelize = require("sequelize");
const { env } = require("process");
const sequelize = new Sequelize(
  env.SQL_DB,
  env.SQL_USER,
  env.SQL_PASS,
  {
    dialect: "mysql",
    port: process.env.SQL_PORT,
  }
);

module.exports = sequelize;

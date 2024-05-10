const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelize");

const list = require("./list");
const User = require("./user");
const Product = require("./product");

const List = sequelize.define("all-lists", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

List.belongsTo(User, { through: list });
Product.belongsToMany(List, { through: list });

module.exports = List;

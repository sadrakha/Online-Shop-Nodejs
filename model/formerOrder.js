const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelize");

const User = require("./user");
const Product = require("./product");
const orderProducts = require("./orders");

const formerOrder = sequelize.define("formerOrder", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

formerOrder.belongsTo(User);
Product.belongsToMany(formerOrder, { through: orderProducts });

module.exports=formerOrder
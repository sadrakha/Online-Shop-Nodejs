const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelize");
const User = require("./user");
const Product = require("./product");
// const Orders = require("./orders");

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  arrivingTime: {
    type: Sequelize.DATE,
    // allowNull:false
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    // allowNull:false,
    // n
    // default:'proccessing'
  },
});

Order.belongsTo(User);
Order.belongsTo(Product);

module.exports = Order;

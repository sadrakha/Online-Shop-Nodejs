const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelize");
const User = require("./user");
const subCategory = require("./subCategory");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  photo: {
    type: Sequelize.STRING,
  },
  selesCount: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  like: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  dislike: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  discount: {
    type: Sequelize.FLOAT,
  },
  visibility: {
    type: Sequelize.STRING,
  },
  stock: {
    type: Sequelize.FLOAT,
  },
});

Product.belongsTo(User, { through: "seller" });
Product.belongsTo(subCategory);

module.exports = Product;

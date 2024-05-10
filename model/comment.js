const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelize");

const User = require("./user");
const Product = require("./product");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

Comment.belongsTo(User);
Comment.belongsTo(Product);

module.exports = Comment;

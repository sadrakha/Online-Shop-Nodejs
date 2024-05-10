const Sequelize = require("sequelize");
const sequelize = require("../utils/sequelize");

const list = sequelize.define("list", {},{
    timestamps: false,

});

module.exports = list;

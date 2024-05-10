const Sequelize = require("sequelize");

const sequelize = require("../utils/sequelize");
const Permission = require("./permission");
const rolePermission = require("./rolePermission");
const User = require("./user");

const Role = sequelize.define(
  "role",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);
Role.belongsToMany(Permission, { through: rolePermission });
Permission.belongsToMany(Role, { through: rolePermission });
rolePermission.belongsTo(Role);
rolePermission.belongsTo(Permission);
User.belongsTo(Role);

module.exports = Role;

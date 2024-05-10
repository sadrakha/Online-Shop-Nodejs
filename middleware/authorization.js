const sequelize = require("../utils/sequelize.service");
const User = new sequelize(require("../model/user"));
const role = new sequelize(require("../model/role"));
const permission = new sequelize(require("../model/permission"));
const rolePermission = new sequelize(require("../model/rolePermission"));

exports.provider = async (req, res, next) => {
  try {
    const userRole = await rolePermission.findAll({
      where: { roleId: req.user.roleId },
    });
    for (let i = 0; i < userRole.length; i++) {
      const userPermission = await permission.findOne({
        where: { id: userRole[i].permissionId },
      });
      if (userPermission.title == "provider") {
        next();
      }
    }
  } catch (error) {
    req.status = 500;
    throw new Error("you are not authorized");
  }
};

exports.admin = async (req, res, next) => {
  try {
    const userRole = await rolePermission.findAll({
      where: { roleId: req.user.roleId },
    });
    for (let i = 0; i < userRole.length; i++) {
      const userPermission = await permission.findOne({
        where: { id: userRole[i].permissionId },
      });
      if (userPermission.title == "admin") {
        next();
      }
    }
  } catch (error) {
    req.status = 500;
    throw new Error("you are not authorized");
  }
};

const Role = require("../../model/role");
const Permission = require("../../model/permission");
const sequelize = require("../../utils/sequelize.service");
const rolePermission = require("../../model/rolePermission");
const { TIME } = require("sequelize");

class role {
  constructor() {
    this.role = new sequelize(Role);
    this.permission = new sequelize(Permission);
    this.rolePermission = new sequelize(rolePermission);
  }
  async getRoles() {
    try {
      const role = await this.role.findAll();
      const permission = await this.permission.findAll();
      const rolePermission = await this.rolePermission.findAll();
      return [role, permission, rolePermission];
    } catch (error) {
      throw new Error(error);
    }
  }
  async addRole(req) {
    try {
      const permissionTitle = req.body.permissionTitle;
      const title = req.body.title;
      const permission = req.body.permissionId;
      let permissionArray = [];
      let permissionResult;
      const roleResult = await this.role.create({ title });
      let result = [];

      if (permissionTitle) {
        permissionResult = await this.permission.create({
          title: permissionTitle,
        });
        result.push(permissionResult);
      }

      for (let i = 0; i < permission.split(",").length; i++) {
        permissionArray.push(permission.split(",")[i]);
      }

      for (let j = 0; j < permissionArray.length; j++) {
        let permissionId;

        if (permissionResult && permissionResult.id == permissionArray[j]) {
          permissionId = permissionResult;
        } else {
          permissionId = await this.permission.findOne({
            where: { id: permissionArray[j] },
          });
        }

        if (!permissionId && !permissionResult) {
          throw new Error("no such permission");
        }

        const rolePermissionResult = await this.rolePermission.create({
          roleId: roleResult.id,
          permissionId: permissionId.id,
        });
        result.push({ roleResult, rolePermissionResult });
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async addPermission(req) {
    try {
      const title = req.body.title;
      const result = await this.permission.create({ title });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteRole(req) {
    try {
      const role = req.params.id;
      const result = await this.role.delete({ where: { id: role } });
      return { result };
    } catch (error) {
      throw new Error(error);
    }
  }
  async editRole(req) {
    try {
      const title = req.body.title;
      const permission = req.body.permissionId;
      let permissionArray = [];
      let result = [];
      const roleResult = await this.role.findOneAndUpdate(
        { title },
        req.params.id
      );
      const roleId = roleResult.id;
      for (let i = 0; i < permission.split(",").length; i++) {
        permissionArray.push(permission.split(",")[i]);
      }

      for (let i = 0; i < permissionArray.length; i++) {
        const permissionId = await this.permission.findOne({
          where: { id: permissionArray[i] },
        });
        if (!permissionId) {
          throw new Error("no such permission");
        }
        const rolePermissionEx = await this.rolePermission.findAll({
          where: { roleId },
        });

        if (
          !rolePermissionEx[0] ||
          !rolePermissionEx[0].permissionId ||
          rolePermissionEx[0].permissionId !== permissionId.id
        ) {
          const rolePermissionResult = await this.rolePermission.create({
            roleId: roleId,
            permissionId: permissionId.id,
          });
          result.push(rolePermissionResult);
        }
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = role;

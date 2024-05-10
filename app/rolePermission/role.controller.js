const roleservice = require("./role.service");
const roleService = new roleservice();

exports.getRoles = async (req, res) => {
  try {
    const result = await roleService.getRoles();
    return res.status(201).send(result);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.addRole = async (req, res, next) => {
  try {
    const addRole = await roleService.addRole(req);
    return res.status(201).send(addRole);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.editRole = async (req, res) => {
  try {
    const result = await roleService.editRole(req);
    return res.status(201).send(result);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const result = await roleService.deleteRole(req);
    return res.status(201).redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

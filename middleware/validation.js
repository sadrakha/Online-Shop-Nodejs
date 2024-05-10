const sequelize = require("../utils/sequelize.service");
const userModel = require("../model/user");
const validator = require("validator");

const User = new sequelize(userModel);

exports.signIn = async (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send("please enter proper email");
  }
  if (await User.findOne({ where: { email: req.body.email } })) {
    return res.status(400).send("this email already exists");
  }
  if (await User.findOne({ where: { userName: req.body.userName } })) {
    return res.status(400).send("this user name already exists");
  }
  if (req.body.password.length < 8 || req.body.comfirmPass.length < 8) {
    return res.status(400).send("password should be at least 8 characters");
  }
  next();
};

exports.logIn = async (req, res, next) => {
  if (validator.isEmail(req.body.user)) {
    if (!(await User.findOne({ where: { email: req.body.user } }))) {
      return res.status(400).send("this email does not exists");
    } else {
      req.email = req.body.user;
    }
  } else {
    if (!(await User.findOne({ where: { userName: req.body.user } }))) {
      return res.status(400).send("this user name does not exists");
    } else {
      req.userName = req.body.user;
    }
  }
  next();
};

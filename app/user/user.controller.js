const { validationResult } = require("express-validator");

const User = require("../../model/user");
const userservice = require("./user.service");
const userService = new userservice();

exports.signUp = async (req, res, next) => {
  try {
    const signUpRes = await userService.signUp(req);

    res.status(200);
    return res.send(signUpRes);
  } catch (error) {
    req.status = 500;
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const logInRes = await userService.logIn(req);
    return res.status(200).send(logInRes);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.main = async (req, res, next) => {
  try {
    const getProducts = await userService.main(req);
    return res.send(getProducts);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.user(req);
    return res.send(user);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req);
    return res.status(201).send(user);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req);
    return res.status(201).redirect("/");
  } catch (error) {
    req.status = 400;
    next(error);
  }
};
exports.product = async (req, res, next) => {
  try {
    const getProduct = await userService.product(req);
    return res.send(getProduct);
  } catch (error) {
    req.status = 400;
    req.status = 400;
    next(error);
  }
};

exports.provider = async (req, res, next) => {
  try {
    const getProvider = await userService.provider(req);
    return getProvider;
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.category = async (req, res, next) => {
  try {
    const getCategory = await userService.category(req);
    return res.send(getCategory);
  } catch (error) {
    req.status = 400;
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const result = await userService.search(req);
    return res.send(result);
  } catch (error) {
    req.status = 404;
    next(error);
  }
};

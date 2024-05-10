const jwt = require("jsonwebtoken");

exports.generateToken = (id) => {
  try {
    const accessToken = jwt.sign({ id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    return accessToken;
  } catch (error) {
    return error;
  }
};

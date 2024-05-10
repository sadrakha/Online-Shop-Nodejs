const jwt = require("jsonwebtoken");

const User = require("../model/user");

exports.verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send("log in ");
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_KEY, async (err, user) => {
    if (err) {
      return res.status(400).send("invalid");
    }
    req.user = await User.findOne({ where: { id: user.id } });
    next();
  });
};

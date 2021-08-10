const db = require("../models");
const User = db.user;

checkIfUserAlreadyExists = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        mesage: "Username already exists",
      });
      return;
    }
    next();
  });
};

const verifyRegistration = {
  checkIfUserAlreadyExists: checkIfUserAlreadyExists,
};

module.exports = verifyRegistration;

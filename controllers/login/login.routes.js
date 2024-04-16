const { body } = require("express-validator");

const loginController = require("./login.controller");
const auth = require("../../middleware/auth").validateToken;

module.exports = function (router) {

  router.post(
    "/auth/login",
    [
      body("email").notEmpty().withMessage("Mandatory field"),
      body("password").notEmpty().withMessage("Mandatory field"),
    ],
    loginController.login
  );

};

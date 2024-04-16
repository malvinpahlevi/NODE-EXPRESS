const { body } = require("express-validator");

const userController = require("./user.controller");
const auth = require("../../middleware/auth").validateToken;

module.exports = function (router) {

  router.post(
    "/user/create",
    [
      body("email").notEmpty().withMessage("Mandatory field"),
      body("password").notEmpty().withMessage("Mandatory field"),
      body("name").notEmpty().withMessage("Mandatory field"),
      body("phone").notEmpty().withMessage("Mandatory field"),
      body("username").isString().withMessage("String only"),
    ],
    auth,
    userController.submitUser
  );

  router.get(
    "/user",
    auth,
    userController.getUser
  );
};

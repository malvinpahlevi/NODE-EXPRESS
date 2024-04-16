const { body } = require("express-validator");

const utilityController = require("./list.controller");

module.exports = function (router) {
  // Get List of Type
  router.post(
    "/list",
    [body("list_typ").notEmpty().withMessage("Mandatory field")],
    utilityController.getListOfType
  );
};

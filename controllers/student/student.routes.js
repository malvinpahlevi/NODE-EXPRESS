const { body } = require("express-validator");

const studentController = require("./student.controller");
const auth = require("../../middleware/auth").validateToken;

module.exports = function (router) {

  router.post(
    "/student/create",
    [
      body("firstName").notEmpty().withMessage("Mandatory field"),
      body("lastName").notEmpty().withMessage("Mandatory field"),
      body("age").notEmpty().withMessage("Mandatory field"),
      body("sex").notEmpty().withMessage("Mandatory field"),
    ],
    // auth,
      studentController.submitStudent
  );

  // get all
    router.get(
      "/student",
      // auth,
      studentController.getStudent
    );

    router.get(
      "/student/:name",
      // auth,
      studentController.getStudentByName
    );

    router.post(
      "/student/byAge",
      [
        body("firstName").isString().withMessage("Firstname field must string"),
        body("age").notEmpty().withMessage("Age field cannot empty"),
      ],
      // auth,
      studentController.getStudentByAge
    );
};

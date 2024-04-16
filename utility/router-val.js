const response = require("../utility/response");

async function routerValidationResult(errors, res) {
  if (!errors.isEmpty()) {
    response.badRequest(
      // "Validation failed, entered data is incorrect.",
      errors.array(),
      res
    );

    return true;
  } else {
    return false;
  }
}

module.exports = {
  routerValidationResult,
};

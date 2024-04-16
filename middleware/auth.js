const moment = require("moment");

const response = require("../utility/response");
const cache = require("../utility/cache-provider");
const { createLog } = require("../utility/create-log");
var jwt = require("jsonwebtoken");

async function validateToken(req, res, next) {
  try {
    const validHeaders = req.headers.authorization ? true : false;

    if (validHeaders){
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(
        token, 
        process.env.AUTH_SECRET, 
        {
          issuer: process.env.APP_NAME
        }, function (err, decoded) {
          if (err) {
            response.badRequest(err.message, res);
          } else {
            // valid
            next();
          }
        }
      );

    } else {
      await createLog("validateToken", "Header authorization not provided!");
      response.badRequest("Invalid Token!", res);
    }
  } catch (error) {
    await createLog(error, "validateToken");
    response.error(error, res);
  }
}

module.exports = {
  validateToken,
};

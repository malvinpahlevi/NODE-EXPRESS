const { body } = require("express-validator");

const ftpClientController = require("./ftp_client.controller");
const auth = require("../../middleware/auth").validateToken;

module.exports = function (router) {

  router.post(
    "/ftp-client/upload",
    ftpClientController.ftpUpload
  );
};

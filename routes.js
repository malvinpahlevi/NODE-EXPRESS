const express = require("express");

function eRoutes() {
  const router = express.Router();

  require("./controllers/student/student.routes")(router);
  require("./controllers/user/user.routes")(router);
  require("./controllers/login/login.routes")(router);
  require("./controllers/ftp_client/ftp_client.routes")(router);

  return router;
}

module.exports = eRoutes;

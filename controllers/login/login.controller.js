const svc = require("./login.services");

const login = (req, res) => svc.loginSvc("login", req, res);

module.exports = {
  login,
 };


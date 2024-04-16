const svc = require("./user.services");

const submitUser = (req, res) => svc.submitUserSvc("submitUser", req, res);
const getUser = (req, res) => svc.getUserSvc("getUser", req, res);

module.exports = {
  submitUser,
  getUser,
 };


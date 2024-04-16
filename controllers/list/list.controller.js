const svc = require("../../controllers/list/list.services");

const getListOfType = (req, res) =>
  svc2.getListOfTypeSvc("getListAll", req, res);

module.exports = { getListOfType };

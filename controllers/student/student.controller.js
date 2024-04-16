const svc = require("./student.services");

const submitStudent = (req, res) => svc.submitStudentSvc("submitStudent", req, res);
const getStudent = (req, res) => svc.getStudentSvc("getStudent", req, res);
const getStudentByName = (req, res) => svc.getStudentByName(req, res);
const getStudentByAge = (req, res) => svc.getStudentByAge(req, res);

module.exports = {
  submitStudent,
  getStudent,
  getStudentByName,
  getStudentByAge
 };


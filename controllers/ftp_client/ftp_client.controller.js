const svc = require("./ftp_client.services");

const ftpUpload = (req, res) => svc.ftpUploadSvc("uploadFile", req, res);

module.exports = {
  ftpUpload,
 };


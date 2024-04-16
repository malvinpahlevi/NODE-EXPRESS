var moment = require("moment");

async function createLog(log, info) {
  let data =
    `${moment().format("YYYY-MM-DD h:mm:ss a")}, Info: ${info}, Err: ` +
    log.toString();
  console.log(data);
}

module.exports = {
  createLog,
};

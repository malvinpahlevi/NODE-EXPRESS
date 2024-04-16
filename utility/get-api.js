const { header } = require("express-validator");
const { createLog } = require("./create-log");

// const dbMain = (req) => req.app.locals.db.mainConfig;

async function getApi(apiCallName, db) {
  try {
    const command = "APP_INQ_GET_API_PARAMS";

    const inputs = [{ name: "apiCall", value: apiCallName }];
    const data = (await db.execute(command, inputs)).recordset;

    let apiData;
    let valid = false;
    let method = "";
    let url = "";
    let body = "";
    let header = "";
    let msg = "";

    if (data.length === 0) {
      valid = false;
      msg = `API data not found! [${apiCallName}]`;
    } else {
      if (data[0].status) {
        valid = true;
        method = data[0].method;
        url = data[0].full_url_path;
        header = data[0].header;
        body = data[0].body;
      } else {
        valid = false;
        msg = `API status not active [${apiCallName}]`;
      }
    }

    apiData = {
      valid: valid,
      method: method,
      url: url,
      body: body,
      header: header,
      msg: msg,
    };

    return apiData;
  } catch (error) {
    createLog(error, `getApi, apiCallName:${apiCallName}`);
    return {
      valid: false,
      method: "",
      url: "",
      body: "",
      msg: error,
    };
  }
}

module.exports = {
  getApi,
};

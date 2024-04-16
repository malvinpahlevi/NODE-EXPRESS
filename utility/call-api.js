const axios = require("axios");

const { createLog } = require("./create-log");

async function callApi(method, url, headers, body) {
  let data;

  const response = await axios({
    method: method,
    url: url,
    headers: headers,
    data: body,
  })
    .then(function (response) {
      if (response.status === 200 || response.status === 201) {
        data = {
          status: response.status,
          data: response.data,
          alert_typ: response.data.length === 0 ? "warning" : "",
          alert_msg: response.data.length === 0 ? "Data not found!" : "",
        };
        return data;
      } else {
        data = {
          status: response.status,
          data: data,
          alert_typ: "warning",
          alert_msg: `Call API status : ${response.status}`,
        };
        return data;
      }
    })
    .catch(function (error) {
      let status;
      let alertTyp;
      let alertMsg;
      if (
        typeof error.response === "undefined" ||
        error.response.status === 500
      ) {
        createLog(
          error,
          `callApi, method: ${method} - url: ${url} - body: ${JSON.stringify(
            body
          )}`
        );

        status = "500";
        alertTyp = "danger";
        alertMsg = `Something wrong to API services!`;
        // alertMsg = `Something wrong to API services! Cause: ${error}, details: [method:${method}, url:${url}, body:${JSON.stringify(
        //   body
        // )}]`;
      } else {
        status = error.response.status;
        alertTyp = "warning";
        alertMsg =
          typeof error.response.data !== "undefined"
            ? JSON.stringify(error.response.data.messages)
            : error;
        data = error.response.data.messages;
      }

      data = {
        status: status,
        data: data,
        alert_typ: alertTyp,
        alert_msg: alertMsg,
      };
      return data;
    });

  return response;
}

module.exports = {
  callApi,
};

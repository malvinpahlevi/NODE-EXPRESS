const { validationResult } = require("express-validator");

const response = require("../../utility/response");
const { createLog } = require("../../utility/create-log");
const { routerValidationResult } = require("../../utility/router-val");
const { spCall, setParams } = require("../../utility/persistances");

const dbMain = (req) => req.app.locals.db.mainConfig;

async function getListOfTypeSvc(spCallName, req, res) {
  try {
    const getRouterValErr = await routerValidationResult(
      validationResult(req),
      res
    );

    if (!getRouterValErr) {
      // get sp name & params information
      const spCallData = await spCall(spCallName, req);

      if (spCallData === "") {
        return response.notfound("Call SP failed!", res);
      }

      // set input params
      let getParamString = spCallData.outSPParamIn.split(",");
      const inputParams = await setParams(getParamString, req);

      const resData = (
        await dbMain(req).execute(spCallData.outSPName, inputParams)
      ).recordset;

      if (resData.length !== 0) {
        //remove unnecessary attr.
        const newResData = resData.map(
          ({ stat_code, stat_remark, ...keepAttrs }) => keepAttrs
        );

        response.ok(
          resData[0].stat_code,
          resData[0].stat_remark,
          newResData,
          res
        );
      } else {
        response.okNotFound(res);
      }

      if (spCallData.outSPName != "") {
      } else {
        response.badRequest("sp call failed!", res);
      }
    }
  } catch (error) {
    createLog(error, "getListOfTypeSvc");
    response.error(error, res);
  }
}

module.exports = { getListOfTypeSvc };

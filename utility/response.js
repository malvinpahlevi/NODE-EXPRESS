exports.ok = function (statCode, statRemark, resData, res) {
  res.status(200);
  let data = {
    stat_code: statCode,
    messages: statRemark,
    total: (resData.length ? resData.length : 0),
    data: resData
  };
  res.json(data);
  res.end();
};

exports.okPagination = function (paginationData, resData, res) {
  res.status(200);
  let data = {
    stat_code: resData[0].stat_code,
    messages: resData[0].stat_remark,
    pagination: {
      total_row: paginationData.total_row,
      page_no: paginationData.page_no,
      rows_of_page: paginationData.rows_of_page,
    },
    data: resData,
  };
  res.json(data);
  res.end();
};

exports.okNotFound = function (res) {
  res.status(200);
  let data = {
    stat_code: "98",
    messages: "Data not found",
  };
  res.json(data);
  res.end();
};

exports.done = function (status, result, res) {
  res.status(201);
  let data = {
    stat_code: status,
    messages: result,
  };
  res.json(data);
  res.end();
};

exports.badRequest = function (msg, res) {
  res.status(400);
  let data = {
    messages: msg,
  };
  res.json(data);
  res.end();
};

exports.notfound = function (msg, res) {
  res.status(404);
  let data = {
    messages: msg,
  };
  res.json(data);
  res.end();
};

exports.error = function (msg, res) {
  res.status(500);
  let data = {
    messages: msg,
  };
  res.json(data);
  res.end();
};

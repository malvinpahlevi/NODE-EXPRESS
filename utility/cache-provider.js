const nodecache = require("node-cache");
const cache = new nodecache({ stdTTL: process.env.CCH_10_TTL });

const hasId = (id) => {
  if (cache.has(id)) {
    return true;
  } else {
    return false;
  }
};

const getId = (id) => {
  return cache.get(id);
};

const delId = (id) => cache.del(id);

const setData = (id, data) => cache.set(id, data);

module.exports = {
  hasId,
  getId,
  setData,
  delId,
};

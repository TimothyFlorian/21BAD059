const cache = {};

const get = (key) => {
  return cache[key];
};

const set = (key, value) => {
  cache[key] = value;
};

module.exports = {
  get,
  set
};

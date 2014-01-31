module.exports = function jsonify(value) {
  return JSON.stringify(value, null, 2);
};

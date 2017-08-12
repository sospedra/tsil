'use strict';

var _require = require('lodash'),
    get = _require.get,
    isArray = _require.isArray,
    isObject = _require.isObject,
    mergeWith = _require.mergeWith,
    omit = _require.omit,
    set = _require.set,
    sortBy = _require.sortBy;

var _require2 = require('./constants'),
    TSIL_KEY = _require2.TSIL_KEY,
    ROOT_KEY = _require2.ROOT_KEY;

var mergeObjectWithArray = function mergeObjectWithArray(destination, source) {
  var destinationIsArray = isArray(destination);
  var sourceIsObject = !isArray(source) && isObject(source);

  if (destinationIsArray && sourceIsObject) {
    return source;
  }
};

var deflatten = function deflatten(sorted) {
  return sorted.reduce(function (memo, node) {
    var path = node[TSIL_KEY].path;
    var origin = omit(node, TSIL_KEY);
    var patch = set({}, path, origin);

    return mergeWith(memo, patch, mergeObjectWithArray);
  });
};

module.exports = function (flat) {
  var sorted = sortBy(flat, function (x) {
    return -x[TSIL_KEY].depth;
  });
  var deflat = deflatten(sorted);

  return get(deflat, ROOT_KEY);
};
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('lodash'),
    assign = _require.assign,
    flatMapDeep = _require.flatMapDeep,
    isObject = _require.isObject,
    map = _require.map;

var _require2 = require('./constants'),
    TSIL_KEY = _require2.TSIL_KEY,
    JOIN_PATH_KEY = _require2.JOIN_PATH_KEY,
    ROOT_KEY = _require2.ROOT_KEY;

var buildPath = function buildPath(from, to) {
  return from + JOIN_PATH_KEY + to;
};

var flattenNested = function flattenNested(branch, path, depth) {
  return map(branch, function (child, name) {
    return isObject(child) ? flatten(child, buildPath(path, name), depth + 1) : [];
  });
};

var flatten = function flatten(subtree, parent, depth) {
  return flatMapDeep(subtree, function (branch, name) {
    var path = buildPath(parent, name);
    var node = assign({}, branch, _defineProperty({}, TSIL_KEY, { path: path, parent: parent, depth: depth }));

    return [node, flattenNested(branch, path, depth)];
  });
};

module.exports = function (tree) {
  return flatten(tree, ROOT_KEY, 0);
};
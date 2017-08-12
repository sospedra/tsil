const {
  assign,
  flatMapDeep,
  isObject,
  map
} = require('lodash')

const {
  TSIL_KEY,
  JOIN_PATH_KEY,
  ROOT_KEY
} = require('./constants')

const buildPath = (from, to) => from + JOIN_PATH_KEY + to

const flattenNested = (branch, path, depth) => {
  return map(branch, (child, name) => {
    return isObject(child)
      ? flatten(child, buildPath(path, name), depth + 1)
      : []
  })
}

const flatten = (subtree, parent, depth) => {
  return flatMapDeep(subtree, (branch, name) => {
    const path = buildPath(parent, name)
    const node = assign({}, branch, {
      [TSIL_KEY]: { path, parent, depth }
    })

    return [node, flattenNested(branch, path, depth)]
  })
}

module.exports = (tree) => {
  return flatten(tree, ROOT_KEY, 0)
}

const {
  flatMapDeep,
  isObject,
  map
} = require('lodash')

const {
  JOIN_PATH_KEY,
  ROOT_KEY,
  TSIL_KEY,
  TSIL_VALUE
} = require('./constants')

/**
 * Create a dot notation path with JOIN_PATH_KEY
 * @param  {String} from
 * @param  {String} to
 * @return {String} path
 */
const buildPath = (from, to) => from + JOIN_PATH_KEY + to

/**
 * Iterate over all branch children.
 * If it's and object/array progress with recursivity
 * calling `flatten` method.
 * If not return an empty array which will be omited.
 *
 * @param  {Object} branch
 * @param  {String} path
 * @param  {Number} depth
 * @return {Any[]}
 */
const flattenNested = (branch, path, depth) => {
  return map(branch, (child, name) => {
    return isObject(child)
      ? flatten(child, buildPath(path, name), depth + 1)
      : []
  })
}

/**
 * Flat map to any level all the children into
 * single-level multiple array nodes.
 * Uses a recursivity strategy alongside with `flattenNested`.
 *
 * @param  {Object} subtree     - From initial one to any level
 * @param  {String} parentPath
 * @param  {Number} depth
 * @return {Object[]} list      - Tsil flatten list
 */
const flatten = (subtree, parentPath, depth) => {
  return flatMapDeep(subtree, (branch, name) => {
    const path = buildPath(parentPath, name)
    const node = {
      [TSIL_KEY]: { path, parentPath, depth },
      [TSIL_VALUE]: branch
    }

    return [node, flattenNested(branch, path, depth)]
  })
}

/**
 * Starting point of flatten list.
 *
 * @param  {Object} tree
 * @return {Object[]} list - Tsil flatten list
 */
module.exports = (tree) => {
  return flatten(tree, ROOT_KEY, 0)
}

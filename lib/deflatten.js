const {
  get,
  isArray,
  isObject,
  mergeWith,
  omitBy,
  set,
  sortBy
} = require('lodash')

const {
  ROOT_KEY,
  TSIL_KEY,
  TSIL_VALUE
} = require('./constants')

/**
 * Customizer for the merge method.
 * If destination is an array and the source is an object
 * return the source without any change.
 *
 * @param  {Any} destination
 * @param  {Any} source
 * @return {Any}
 */
const mergeObjectWithArray = (destination, source) => {
  const destinationIsArray = isArray(destination)
  const sourceIsObject = !isArray(source) && isObject(source)

  if (destinationIsArray && sourceIsObject) {
    return source
  }
}

/**
 * Given the node[TSIL_VALUE] return either a children (object)
 * filtered value or the raw one if it's not an object itself
 *
 * @param  {Any} value - node[TSIL_VALUE]
 * @return {Any} withoutChildren - value without children nodes
 */
const withoutChildren = (value) => {
  return isObject(value) ? omitBy(value, isObject) : value
}

/**
 * Given a sorted list return an object with the
 * original structure.
 * Create an object with the node values applied by the path.
 * Do not include the children because it'll override
 * modified values.
 *
 * @param  {Any[]} sorted   - Tsil flatten list sorted by depth
 * @return {Object} deflat  - Rebuilt object under ROOT_KEY param
 */
const deflatten = (sorted) => {
  return sorted.reduce((memo, node) => {
    const path = node[TSIL_KEY].path
    const patch = set({}, path, withoutChildren(node[TSIL_VALUE]))

    return mergeWith(memo, patch, mergeObjectWithArray)
  }, {})
}

/**
 * Exported deflatten method.
 * Given a tsil flatten list return the rebuilt object.
 * Sort by depth to ensure that deepest children are
 * evaluated first.
 *
 * @param  {Any[]} flat
 * @return {Object}
 */
module.exports = (flat) => {
  const sorted = sortBy(flat, (x) => -x[TSIL_KEY].depth)
  const deflat = deflatten(sorted)

  return get(deflat, ROOT_KEY)
}

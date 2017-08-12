const {
  get,
  isArray,
  isObject,
  mergeWith,
  omit,
  set,
  sortBy
} = require('lodash')

const { TSIL_KEY, ROOT_KEY } = require('./constants')

const mergeObjectWithArray = (destination, source) => {
  const destinationIsArray = isArray(destination)
  const sourceIsObject = !isArray(source) && isObject(source)

  if (destinationIsArray && sourceIsObject) {
    return source
  }
}

const deflatten = (sorted) => {
  return sorted.reduce((memo, node) => {
    const path = node[TSIL_KEY].path
    const origin = omit(node, TSIL_KEY)
    const patch = set({}, path, origin)

    return mergeWith(memo, patch, mergeObjectWithArray)
  })
}

module.exports = (flat) => {
  const sorted = sortBy(flat, (x) => -x[TSIL_KEY].depth)
  const deflat = deflatten(sorted)

  return get(deflat, ROOT_KEY)
}

const { isObject } = require('lodash')

const { TSIL_VALUE } = require('./constants')

module.exports = {}

module.exports.modify = (flat, callback) => {
  return flat.map((node) => {
    return Object.assign({}, node, {
      [TSIL_VALUE]: callback(node[TSIL_VALUE])
    })
  })
}

module.exports.merge = (flat, callback) => {
  return flat.map((node) => {
    const value = node[TSIL_VALUE]
    const change = callback(value)

    return Object.assign({}, node, {
      [TSIL_VALUE]: isObject(value) && isObject(change)
        ? Object.assign({}, value, change)
        : change
    })
  })
}

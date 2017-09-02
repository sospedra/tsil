const flatten = require('./flatten')
const deflatten = require('./deflatten')
const { modify, merge } = require('./modify')
const { TSIL_VALUE } = require('./constants')

module.exports = {
  deflatten,
  flatten,
  merge,
  modify,
  VAL: TSIL_VALUE
}

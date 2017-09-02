const flatten = require('./flatten')
const deflatten = require('./deflatten')
const { TSIL_VALUE } = require('./constants')

module.exports = {
  deflatten,
  flatten,
  VAL: TSIL_VALUE
}

const test = require('ava')
const { isEqual } = require('lodash')

const flatten = require('../lib/flatten')
const deflatten = require('../lib/deflatten')
const treeTest = require('./tree')

const plain = flatten(treeTest)
const rebuilt = deflatten(plain)

test('flatten and deflatten without changes outputs same object', (t) => {
  t.true(isEqual(rebuilt, treeTest))
})

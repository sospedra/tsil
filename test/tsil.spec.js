const test = require('ava')
const { isEqual } = require('lodash')

const tsil = require('../lib/index')
const treeTest = require('./tree')

const plain = tsil.flatten(treeTest)
const rebuilt = tsil.deflatten(plain)

test('flatten and deflatten without changes outputs same object', (t) => {
  t.true(isEqual(rebuilt, treeTest))
})

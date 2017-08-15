const test = require('ava')
const { clone, isEqual } = require('lodash')

const tsil = require('../lib/index')
const treeTest = require('./tree')

test('flatten and deflatten without changes outputs same object', (t) => {
  const list = tsil.flatten(treeTest)
  const rebuilt = tsil.deflatten(list)

  t.plan(1)
  t.true(isEqual(rebuilt, treeTest))
})

test('modify flatten list and deflatten keeping structure', (t) => {
  const list = tsil.flatten(treeTest).map((x) => {
    return Object.assign({}, x, { v: x.v * 10 })
  })
  const rebuilt = tsil.deflatten(list)

  t.plan(2)
  t.true(rebuilt.b.v === treeTest.b.v * 10)
  t.true(rebuilt.c.c[1].c.c3.v === treeTest.c.c[1].c.c3.v * 10)
})

test('modify values does not change original object', (t) => {
  const controlTester = clone(treeTest)

  tsil.flatten(treeTest).map((x) => {
    return Object.assign({}, x, { extra: 1337 })
  })

  t.plan(1)
  t.true(isEqual(controlTester, treeTest))
})

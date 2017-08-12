const { isEqual } = require('lodash')

const flatten = require('../lib/flatten')
const deflatten = require('../lib/deflatten')
const treeTest = require('./tree')

const plain = flatten(treeTest)
const rebuilt = deflatten(plain)

console.log('isEqual', isEqual(rebuilt, treeTest))

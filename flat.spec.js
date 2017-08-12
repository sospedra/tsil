const _ = require('lodash')
const flatten = require('./lib/flatten')
const deflatten = require('./lib/deflatten')

const treeTest = {
  a: { v: 1, noise: 9, c: {
    a1: { v: 11, c: null, nisi: 9 },
  } },
  b: { v: 2, c: null, no: 3, ise: true },
  c: { v: 3, c: [
    { v: 31, c: null}, { v: 32, n: 'oise', c: { c3: { v: 43 }}}
  ] },
  expedimus: { v: 40, n: 0, c: [ {v:0} ] }
}

const plain = flatten(treeTest)
const rebuilt = deflatten(plain)

console.log('isEqual', _.isEqual(rebuilt, treeTest))

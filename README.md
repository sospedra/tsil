# <a href='https://github.com/sospedra/tsil'><img src='https://user-images.githubusercontent.com/3116899/29243352-52c872c6-7f9d-11e7-8c7d-45b9354f1844.png'></a>

[![Build Status](https://travis-ci.org/sospedra/tsil.svg?branch=master)](https://travis-ci.org/sospedra/tsil)
[![Coverage Status](https://coveralls.io/repos/github/sospedra/tsil/badge.svg?branch=master)](https://coveralls.io/github/sospedra/tsil?branch=master)
[![dependencies Status](https://david-dm.org/sospedra/tsil/status.svg)](https://david-dm.org/sospedra/tsil)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Tsil can flatten any object into a flat ~~tsil~~ list. Allowing you to easily and efficiently modify your data. And then deflatten the list into the original structure.

## Example

Starting with the following object:

```js
const characters = {
  byHouse: {
    stark: [
      {
        name: 'Jon',
        age: 23
      },
      {
        name: 'Arya',
        age: 12
      }
    ],
    martell: [
      {
        name: 'Oberyn',
        age: 33
      }
    ]
  }
}
```

We can deep flatten all the nodes into:

```js
const flat = tsil.flatten(characters)

// [
//  { byHouse: ... },
//  { name: ... },
//  ...
// ]
```

Then we modify whatever we need withour worrying about structures:

```js
const withChanges = flat.map((node) => {
  return !node.name ? node : Object.assign(node, {
    isBastard: node.name === 'Jon'
  })
})
```

And finally we deflatten the resulting list

```js
tsil.deflatten(withChanges)

// evaluates to
{
  byHouse: {
    stark: [
      {
        name: 'Jon',
        age: 23,
        isBastard: true
      },
      {
        name: 'Arya',
        age: 12,
        isBastard: false
      }
    ],
    martell: [
      {
        name: 'Oberyn',
        age: 33,
        isBastard: false
      }
    ]
  }
}
```

## API

### `tsil.flatten`

Given any object returns a flatten list of nodes.

### `tsil.deflatten`

Given a `tsil` list of nodes returns the original structure.

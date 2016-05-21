/**
 * Store json in encrypted format.
 * @module cipherjson
 */

'use strict'

const Cipherjson = require('./cipherjson')
const create = require('./create')

let lib = create.bind(this)

Object.assign(lib, {
  create,
  Cipherjson
})

module.exports = lib

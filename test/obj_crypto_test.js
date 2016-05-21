/**
 * Test case for objCrypto.
 * Runs with mocha.
 */
'use strict'

const objCrypto = require('../lib/crypting/obj_crypto.js')
const co = require('co')
const assert = require('assert')

describe('obj-crypto', () => {
  before(() => co(function * () {
  }))

  after(() => co(function * () {
  }))

  it('Obj crypto', () => co(function * () {
    let chiphered = objCrypto.cipherObject(
      'aes-256-cbc',
      'hogehoge',
      {
        foo: 'bar'
      }
    )
    let deciphered = objCrypto.decipherObject(
      'aes-256-cbc',
      'hogehoge',
      {
        foo: 'bar'
      }
    )
    assert.ok(chiphered.foo)
    assert.deepEqual(deciphered, { foo: 'bar' })
  }))
})

/* global describe, before, after, it */

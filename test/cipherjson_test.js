/**
 * Test case for cipherjson.
 * Runs with mocha.
 */
'use strict'

const Cipherjson = require('../lib/cipherjson.js')
const co = require('co')
const assert = require('assert')

describe('cipherjson', () => {
  before(() => co(function * () {
  }))

  after(() => co(function * () {
  }))

  it('Write and read.', () => co(function * () {
    let filename = `${__dirname}/../tmp/testing.secret.json`
    let cipherjson = new Cipherjson('hoge')
    yield cipherjson.write(filename, {
      foo: 'bar'
    })
    let data = yield cipherjson.read(filename)
    assert.deepEqual(data, { foo: 'bar' })
  }))

  it('Write and read sync.', () => co(function * () {
    let filename = `${__dirname}/../tmp/testing.secret.json`
    let cipherjson = new Cipherjson('hoge')
    yield cipherjson.write(filename, {
      foo: 'bar'
    })
    let data = cipherjson.readSync(filename)
    assert.deepEqual(data, { foo: 'bar' })
  }))

  it('Read not ciphered', () => co(function * () {
    let filename = require.resolve('../doc/mocks/mock-data.json')
    let cipherjson = new Cipherjson('hoge')
    let data = yield cipherjson.read(filename)
    assert.deepEqual(data, { foo: 'bar' })
  }))
})

/* global describe, before, after, it */

/**
 * Test case for cipherjson.
 * Runs with mocha.
 */
'use strict'

const Cipherjson = require('../lib/cipherjson.js')
const assert = require('assert')

describe('cipherjson', () => {
  it('Write and read.', async () => {
    const filename = `${__dirname}/../tmp/testing.secret.json`
    const cipherjson = new Cipherjson('hogehogehogehoge')
    await cipherjson.write(filename, {
      foo: 'bar',
      foo2: '1234asdflaskjdf;l1k3j'
    })
    const cipherjson2 = new Cipherjson('hogehogehogehoge')
    const data = await cipherjson2.read(filename)
    assert.equal(data.foo, 'bar')
    assert.equal(data.foo2, '1234asdflaskjdf;l1k3j')
  })

  it('Write and read sync.', async () => {
    let filename = `${__dirname}/../tmp/testing.secret.json`
    let cipherjson = new Cipherjson('hoge')
    await cipherjson.write(filename, {
      foo: 'bar'
    })
    let data = cipherjson.readSync(filename)
    assert.equal(data.foo, 'bar')
  })

  it('Read not ciphered', async () => {
    let filename = require.resolve('../doc/mocks/mock-data.json')
    let cipherjson = new Cipherjson('hoge')
    let data = await cipherjson.read(filename)
    assert.deepEqual(data, { foo: 'bar' })
  })
})

/* global describe, before, after, it */

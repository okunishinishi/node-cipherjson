/**
 * Test case for cipherjson.
 * Runs with mocha.
 */
'use strict'

const Cipherjson = require('../lib/cipherjson.js')
const assert = require('assert').strict
const path = require('path')
const { writeFileAsync, mkdirpAsync } = require('asfs')

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
    const filename = require.resolve('../doc/mocks/mock-data.json')
    const cipherjson = new Cipherjson('hoge')
    const data = await cipherjson.read(filename)
    assert.deepEqual(data, { foo: 'bar' })
  })

  it('hoge', async () => {
    const filename = `${__dirname}/../tmp/hoge/testing-migration-01.json`
    await mkdirpAsync(path.dirname(filename))
    await writeFileAsync(filename, JSON.stringify({
      foo: 'This is foo',
    }))
    const PASSWORD = 'pppp'
    const cipherjson = new Cipherjson(PASSWORD)
    await cipherjson.write(filename, {
      bar: 'This is bar'
    })
    assert.deepEqual(
      await cipherjson.read(filename),
      {
        bar: 'This is bar',
      }
    )
  })
})

/* global describe, before, after, it */

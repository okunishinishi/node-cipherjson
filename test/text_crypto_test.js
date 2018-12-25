/**
 * Test case for textCrypto.
 * Runs with mocha.
 */
'use strict'

const textCrypto = require('../lib/crypting/text_crypto.js')
const assert = require('assert')

describe('text-crypto', () => {

  it('Text crypto', async () => {
    const algorithm = 'aes-256-cbc'
    for (const iv of [true, false]) {
      const encrypted = textCrypto.cipherText(algorithm, 'hogehogehogehoge', 'this is hoge', { iv })

      assert.equal(
        textCrypto.decipherText(algorithm, 'hogehogehogehoge', encrypted, { iv }),
        'this is hoge',
      )
    }
  })
})

/* global describe, before, after, it */

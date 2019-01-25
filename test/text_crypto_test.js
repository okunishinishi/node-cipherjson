/**
 * Test case for textCrypto.
 * Runs with mocha.
 */
'use strict'

const textCrypto = require('../lib/crypting/text_crypto.js')
const assert = require('assert')
const crypto = require('crypto')

describe('text-crypto', () => {

  it('Text crypto', async () => {
    const algorithm = 'aes-256-cbc'
    const iv01 = crypto.randomBytes(16)
    for (const iv of [null, iv01]) {
      const encrypted = textCrypto.cipherText(algorithm, 'hogehogehogehoge', 'this is hoge', { iv })

      assert.equal(
        textCrypto.decipherText(algorithm, 'hogehogehogehoge', encrypted, { iv }),
        'this is hoge',
      )
    }
  })
})

/* global describe, before, after, it */

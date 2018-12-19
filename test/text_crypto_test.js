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
    const encrypted = textCrypto.cipherText(algorithm, 'hogehogehogehoge', 'this is hoge')

    console.log(
      textCrypto.decipherText(algorithm, 'hogehogehogehoge', encrypted)
    )
  })
})

/* global describe, before, after, it */

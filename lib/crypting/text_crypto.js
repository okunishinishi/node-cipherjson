/**
 */
'use strict'

const crypto = require('crypto')

const TEXT_ENCODE = 'utf-8'
const CRYPTO_ENCODE = 'hex'
const IV_LENGTH = 16
const KEY_LENGTH = 32
const iv = crypto.randomBytes(IV_LENGTH) // TODO

exports.cipherText = function cipher (algorithm, password, text) {
  const key = password.padStart(KEY_LENGTH, 'x')
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  return cipher.update(text, TEXT_ENCODE, CRYPTO_ENCODE) + cipher.final(CRYPTO_ENCODE)
}

exports.decipherText = function decipher (algorithm, password, encrypted) {
  const key = password.padStart(KEY_LENGTH, 'x')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  return decipher.update(encrypted, CRYPTO_ENCODE, TEXT_ENCODE) + decipher.final(TEXT_ENCODE)
}


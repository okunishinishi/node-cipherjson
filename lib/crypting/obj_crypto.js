/**
 */
'use strict'

const objnest = require('objnest')
const qs = require('qs')
const textCrypto = require('./text_crypto')
const IV_LENGTH = 16
const crypto = require('crypto')

const PREFIX = 'enciphered:'
const pkg = require('../../package')
const META_FIELD_KEY = '__encryption__'

const isCiphered = (value) => value.indexOf(PREFIX) === 0

exports.cipherObject = function cipher (algorithm, password, data) {
  const iv = crypto.randomBytes(IV_LENGTH)
  const result = {
    [META_FIELD_KEY]: qs.stringify({
      by: [pkg.name, pkg.version].join('@'),
      iv: iv.toString('hex'),
      ivLength: IV_LENGTH,
    })
  }
  const expanded = objnest.flatten(data || {})
  Object.keys(expanded).forEach((key) => {
    let value = String(expanded[key])
    if (isCiphered(value)) {
      result[key] = value
    } else {
      result[key] = PREFIX + textCrypto.cipherText(algorithm, password, value, {
        iv,
      })
    }
  })
  return result
}

exports.decipherObject = function decipher (algorithm, password, data, options = {}) {
  const result = {}
  const meta = qs.parse(data[META_FIELD_KEY] || '')
  const iv = ('iv' in meta) ? Buffer.from(meta.iv, 'hex') : null
  for (const [key, value] of Object.entries(data)) {
    if (key === META_FIELD_KEY) {
      continue
    }
    if (isCiphered(value)) {
      result[key] = textCrypto.decipherText(algorithm, password, String(value).replace(PREFIX, ''), {
        iv,
      })
    } else {
      result[key] = String(value)
    }
  }
  return objnest.expand(result)
}


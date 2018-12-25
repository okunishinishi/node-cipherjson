/**
 */
'use strict'

const objnest = require('objnest')
const qs = require('qs')
const textCrypto = require('./text_crypto')

const PREFIX = 'enciphered:'
const pkg = require('../../package')
const META_FIELD_KEY = '__encryption__'

const isCiphered = (value) => value.indexOf(PREFIX) === 0

exports.cipherObject = function cipher (algorithm, password, data) {
  const iv = true
  const result = {
    [META_FIELD_KEY]: qs.stringify({
      by: [pkg.name, pkg.version].join('@'),
      iv,
    })
  }
  const expanded = objnest.flatten(data || {})
  Object.keys(expanded).forEach((key) => {
    let value = String(expanded[key])
    if (isCiphered(value)) {
      result[key] = value
    } else {
      result[key] = PREFIX + textCrypto.cipherText(algorithm, password, value, {
        iv
      })
    }
  })
  return result
}

exports.decipherObject = function decipher (algorithm, password, data, options = {}) {
  const result = {}
  const meta = qs.parse(data[META_FIELD_KEY] || '')
  for (const [key, value] of Object.entries(data)) {
    if (key === META_FIELD_KEY) {
      continue
    }
    if (isCiphered(value)) {
      result[key] = textCrypto.decipherText(algorithm, password, String(value).replace(PREFIX, ''), { iv: meta.iv })
    } else {
      result[key] = String(value)
    }
  }
  return objnest.expand(result)
}


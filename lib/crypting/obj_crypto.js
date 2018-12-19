/**
 */
'use strict'

const objnest = require('objnest')
const textCrypto = require('./text_crypto')

const PREFIX = 'enciphered:'

const isCiphered = (value) => value.indexOf(PREFIX) === 0

exports.cipherObject = function cipher (algorithm, password, data) {
  const result = {}
  const expanded = objnest.flatten(data || {})
  Object.keys(expanded).forEach((key) => {
    let value = String(expanded[key])
    if (isCiphered(value)) {
      result[key] = value
    } else {
      result[key] = PREFIX + textCrypto.cipherText(algorithm, password, value)
    }
  })
  return result
}

exports.decipherObject = function decipher (algorithm, password, data) {
  const result = {}
  Object.keys(data).forEach((key) => {
    const value = String(data[key])
    if (isCiphered(value)) {
      result[key] = textCrypto.decipherText(algorithm, password, value.replace(PREFIX, ''))
    } else {
      result[key] = value
    }
  })
  return objnest.expand(result)
}


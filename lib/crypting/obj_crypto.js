/**
 */
'use strict'

const objnest = require('objnest')
const textCrypto = require('./text_crypto')

const PREFIX = 'enciphered:'

exports.cipherObject = function cipher (algorithm, password, data) {
  let result = {}
  let expanded = objnest.flatten(data || {})
  Object.keys(expanded).forEach((key) => {
    let value = String(expanded[ key ])
    result[ key ] = PREFIX + textCrypto.cipherText(algorithm, password, value)
  })
  return result
}

exports.decipherObject = function decipher (algorithm, password, data) {
  let result = {}
  Object.keys(data).forEach((key) => {
    let value = String(data[ key ])
    let enciphered = (value.indexOf(PREFIX) === 0)
    if (enciphered) {
      result[ key ] = textCrypto.decipherText(algorithm, password, value.replace(PREFIX, ''))
    } else {
      result[ key ] = value
    }
  })
  return objnest.expand(result)
}


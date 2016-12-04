/**
 * @constructor Cipherjson
 * @param {string} password - Password
 * @param {object} [options] - Optional settings.
 * @param {string} options.algorithm - Algorithm to work with.
 */

'use strict'

const writeout = require('writeout')
const co = require('co')
const argx = require('argx')
const fs = require('fs')
const abind = require('abind')
const objCrypto = require('./crypting/obj_crypto')

/** @lends Cipherjson */
function Cipherjson (password, options = {}) {
  const s = this
  s._algorithm = options.algorithm || 'aes-256-cbc'
  s._password = password
  abind(s)
}

Cipherjson.prototype = {
  /**
   * Cipher values
   * @param {Object} values - Values to cipher
   * @param {Object} {options=[]} - Optional settings
   * @returns {Object}
   */
  cipher (values, options = {}) {
    const s = this
    return objCrypto.cipherObject(s._algorithm, s._password, values)
  },
  /**
   * Decipher values
   * @param {Object} data - Data to decipher
   * @param {Object} {options=[]} - Optional settings
   * @returns {Object}
   */
  decipher (data, options = {}) {
    const s = this
    try {
      return objCrypto.decipherObject(s._algorithm, s._password, data)
    } catch (e) {
      throw new Error('Password incorrect')
    }
  },
  /**
   * Convert and write into file
   * @param {string} filename - File name to write
   * @param {Object} values - Values to cipher
   * @param {Object} [options=[]} - Optional settings
   * @returns {Promise}
   */
  write (filename, values, options = {}) {
    const s = this
    if (argx(arguments).pop('function')) {
      throw new Error('Callback is no longer supported. Use promise interface instead.')
    }
    return co(function * () {
      let data = s.cipher(values)
      return yield writeout(filename, JSON.stringify(data, null, 4), {
        mkdirp: true,
        skipIfIdentical: true
      })
    })
  },
  /**
   * Read ciphered file
   * @param {string} filename - File name to write
   * @param {Object} [options=[]} - Optional settings
   * @returns {Promise}
   */
  read (filename, options = {}) {
    const s = this
    if (argx(arguments).pop('function')) {
      throw new Error('Callback is no longer supported. Use promise interface instead.')
    }
    return co(function * () {
      let exists = yield new Promise((resolve) =>
        fs.exists(filename, (exists) => resolve(exists))
      )
      if (!exists) {
        return {}
      }
      let data = yield new Promise((resolve, reject) =>
        fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data))
      )
      data = JSON.parse(data)
      return s.decipher(data, options)
    })
  },
  readSync (filename, options = {}) {
    const s = this
    let exists = fs.existsSync(filename)
    if (!exists) {
      return {}
    }
    let data = JSON.parse(fs.readFileSync(filename).toString())
    return s.decipher(data)
  }
}

module.exports = Cipherjson

/**
 * @constructor Cipherjson
 * @param {string} password - Password
 * @param {object} [options] - Optional settings.
 * @param {string} options.algorithm - Algorithm to work with.
 */

'use strict'

const writeout = require('writeout')
const argx = require('argx')
const fs = require('fs')
const abind = require('abind')
const objCrypto = require('./crypting/obj_crypto')

/** @lends Cipherjson */
function Cipherjson (password, options = {}) {
  this._algorithm = options.algorithm || 'aes-256-cbc'
  this._password = password
  abind(this)
}

Cipherjson.prototype = {
  /**
   * Cipher values
   * @param {Object} values - Values to cipher
   * @param {Object} [options={}] - Optional settings
   * @returns {Object}
   */
  cipher (values, options = {}) {
    return objCrypto.cipherObject(this._algorithm, this._password, values)
  },
  /**
   * Decipher values
   * @param {Object} data - Data to decipher
   * @param {Object} [options={}] - Optional settings
   * @returns {Object}
   */
  decipher (data, options = {}) {
    try {
      return objCrypto.decipherObject(this._algorithm, this._password, data)
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
  async write (filename, values, options = {}) {
    const { encrypt = true } = options
    if (argx(arguments).pop('function')) {
      throw new Error('Callback is no longer supported. Use promise interface instead.')
    }
    const data = encrypt ? this.cipher(values) : values
    return await writeout(filename, JSON.stringify(data, null, 4), {
      mkdirp: true,
      skipIfIdentical: true
    })
  },
  /**
   * Read ciphered file
   * @param {string} filename - File name to write
   * @param {Object} [options=[]} - Optional settings
   * @returns {Promise}
   */
  async read (filename, options = {}) {
    const { decrypt = true } = options
    if (argx(arguments).pop('function')) {
      throw new Error('Callback is no longer supported. Use promise interface instead.')
    }
    const exists = await new Promise((resolve) =>
      fs.exists(filename, (exists) => resolve(exists))
    )
    if (!exists) {
      return {}
    }
    let data = await new Promise((resolve, reject) =>
      fs.readFile(filename, (err, data) => err ? reject(err) : resolve(data))
    )
    data = JSON.parse(data)
    return decrypt ? this.decipher(data, options) : data
  },
  readSync (filename, options = {}) {
    const exists = fs.existsSync(filename)
    if (!exists) {
      return {}
    }
    const data = JSON.parse(fs.readFileSync(filename).toString())
    return this.decipher(data)
  }
}

module.exports = Cipherjson

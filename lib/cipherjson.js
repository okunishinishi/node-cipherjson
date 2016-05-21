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
const objCrypto = require('./crypting/obj_crypto')

/** @lends Cipherjson */
function Cipherjson (password, options = {}) {
  const s = this
  s._algorithm = options.algorithm || 'aes-256-cbc'
  s._password = password
}

Cipherjson.prototype = {
  write (filename, values, options = {}) {
    const s = this
    if (argx(arguments).pop('function')) {
      throw new Error('Callback is no longer supported. Use promise interface instead.')
    }
    return co(function * () {
      let data = objCrypto.cipherObject(s._algorithm, s._password, values)
      yield writeout(filename, JSON.stringify(data, null, 4), {
        mkdirp: true,
        skipIfIdentical: true
      })
    })
  },
  read (filename, options) {
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
      try {
        return objCrypto.decipherObject(s._algorithm, s._password, data)
      } catch (e) {
        throw new Error('Password incorrect')
      }
    })
  },
  readSync (filename, options = {}) {
    const s = this
    let exists = fs.existsSync(filename)
    if (!exists) {
      return {}
    }
    let data = JSON.parse(fs.readFileSync(filename).toString())
    return objCrypto.decipherObject(s._algorithm, s._password, data)
  }
}

module.exports = Cipherjson

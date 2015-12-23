/**
 * @constructor Cipherjson
 * @param {string} password - Password
 * @param {object} [options] - Optional settings.
 * @param {string} options.algorithm - Algorithm to work with.
 */

"use strict";

const writeout = require('writeout'),
    async = require('async'),
    argx = require('argx'),
    fs = require('fs'),
    objCrypto = require('./crypting/obj_crypto');

/** @lends Cipherjson */
function Cipherjson(password, options) {
    let s = this;
    options = options || {};

    s._algorithm = options.algorithm || 'aes-256-cbc';
    s._password = password;
}

Cipherjson.prototype = {
    write: function (filename, values, options,callback) {
        let s = this;
        let args = argx(arguments);
        callback = args.pop('function') || argx.noop;
        options = args.pop('object') || {};
        let data = objCrypto.cipherObject(s._algorithm, s._password, values);
        writeout(filename, JSON.stringify(data, null, 4), {
            mkdirp: true,
            skipIfIdentical: true
        }, callback);
    },
    read: function (filename, options,callback) {
        let s = this;
        let args = argx(arguments);
        callback = args.pop('function') || argx.noop;
        options = args.pop('object') || {};
        async.waterfall([
            (callback) => {
                fs.readFile(filename, callback);
            },
            (data, callback) => {
                let values = JSON.parse(data);
                let result = objCrypto.decipherObject(s._algorithm, s._password, values);
                callback(null, result);
            }
        ], callback);
    }
};

module.exports = Cipherjson;

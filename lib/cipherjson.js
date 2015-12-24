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
    write: function (filename, values, options, callback) {
        let s = this;
        let args = argx(arguments);
        callback = args.pop('function') || argx.noop;
        options = args.pop('object') || {};
        try {
            let data = objCrypto.cipherObject(s._algorithm, s._password, values);
            writeout(filename, JSON.stringify(data, null, 4), {
                mkdirp: true,
                skipIfIdentical: true
            }, callback);
        } catch (e) {
            callback(e);
        }
    },
    read: function (filename, options, callback) {
        let s = this;
        let args = argx(arguments);
        callback = args.pop('function') || argx.noop;
        options = args.pop('object') || {};
        fs.exists(filename, (exists) => {
            if (!exists) {
                callback(null, {});
                return;
            }
            async.waterfall([
                (callback) => {
                    fs.readFile(filename, callback);
                },
                (data, callback) => {
                    try {
                        callback(null, JSON.parse(data));
                    } catch (e) {
                        callback(e);
                    }
                },
                (data, callback) => {
                    try {
                        let result = objCrypto.decipherObject(s._algorithm, s._password, data);
                        callback(null, result);
                    } catch (e) {
                        callback(new Error('Password incorrect'));
                    }
                }
            ], callback);
        });
    },
    readSync: function (filename, options) {
        let s = this;
        let exists = fs.existsSync(filename);
        if (!exists) {
            return {};
        }
        let data = JSON.parse(fs.readFileSync(filename).toString());
        return objCrypto.decipherObject(s._algorithm, s._password, data);
    }
};

module.exports = Cipherjson;

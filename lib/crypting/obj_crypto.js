/**
 */
"use strict";

const crypto = require('crypto'),
    objnest = require('objnest'),
    textCrypto = require('./text_crypto');

const PREFIX = 'enciphered:';
exports.cipherObject = function cipher(algorithm, password, data) {
    let result = {};
    let expanded = objnest.flatten(data || {});
    Object.keys(expanded).forEach((key) => {
        let value = String(expanded[key]);
        result[key] = PREFIX + textCrypto.cipherText(algorithm, password, value);
    });
    return result;
};

exports.decipherObject = function decipher(algorithm, password, data) {
    let result = {};
    Object.keys(data).forEach((key) => {
        let value = String(data[key]);
        result[key] = textCrypto.decipherText(algorithm, password, value.replace(PREFIX, ''));
    });
    return objnest.expand(result);
};
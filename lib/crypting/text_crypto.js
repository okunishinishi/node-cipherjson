/**
 */
"use strict";

const crypto = require('crypto');

const TEXT_ENCODE = 'utf-8',
    CRYPTO_ENCODE = 'hex';

exports.cipherText = function cipher(algorithm, password, text) {
    let cipher = crypto.createCipher(algorithm, password);
    return cipher.update(text, TEXT_ENCODE, CRYPTO_ENCODE) + cipher.final(CRYPTO_ENCODE);
};

exports.decipherText = function decipher(algorithm, password, encrypted) {
    let decipher = crypto.createDecipher(algorithm, password);
    return decipher.update(encrypted, CRYPTO_ENCODE, TEXT_ENCODE) + decipher.final(TEXT_ENCODE);
};


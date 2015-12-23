/**
 * @function create
 */
"use strict";

const Cipherjson = require('./cipherjson');

/** @lends create */
function create(password, options) {
    return new Cipherjson(password, options);
}

module.exports = create;

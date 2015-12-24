/**
 * Store json in encrypted format.
 * @module cipherjson
 */

"use strict";

const Cipherjson = require('./cipherjson'),
    create = require('./create');

let lib = create.bind(this);
lib.create = create;
lib.Cipherjson = Cipherjson;
module.exports = lib;
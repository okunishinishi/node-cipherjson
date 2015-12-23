/**
 * Test case for cipherjson.
 * Runs with mocha.
 */
"use strict";

const Cipherjson = require('../lib/cipherjson.js'),
    assert = require('assert');

describe('cipherjson', () => {

    before((done) => {
        done();
    });

    after((done) => {
        done();
    });


    it('Cipherjson', (done) => {
        let filename = `${__dirname}/../tmp/testing.secret.json`;
        let cipherjson = new Cipherjson('hoge');
        cipherjson.write(filename, {
            foo: 'bar'
        }, (err) => {
            assert.ifError(err);
            cipherjson.read(filename, (err, data) => {
                assert.ifError(err);
                assert.deepEqual(data, {foo: 'bar'});
                console.log(data);
                done();
            });
        });
    });
});


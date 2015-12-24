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


    it('Write and read.', (done) => {
        let filename = `${__dirname}/../tmp/testing.secret.json`;
        let cipherjson = new Cipherjson('hoge');
        cipherjson.write(filename, {
            foo: 'bar'
        }, (err) => {
            assert.ifError(err);
            cipherjson.read(filename, (err, data) => {
                assert.ifError(err);
                assert.deepEqual(data, {foo: 'bar'});
                done();
            });
        });
    });

    it('Write and read sync.', (done) => {
        let filename = `${__dirname}/../tmp/testing.secret.json`;
        let cipherjson = new Cipherjson('hoge');
        cipherjson.write(filename, {
            foo: 'bar'
        }, (err) => {
            assert.ifError(err);
            let data = cipherjson.readSync(filename);
            assert.deepEqual(data, {foo: 'bar'});
            done();
        });
    });

    it('Read not ciphered', (done) => {
        let filename = require.resolve('../doc/mocks/mock-data.json');
        let cipherjson = new Cipherjson('hoge');
        cipherjson.read(filename, (err, data) => {
            assert.ifError(err);
            assert.deepEqual(data, {foo: 'bar'});
            done();
        });
    })
});


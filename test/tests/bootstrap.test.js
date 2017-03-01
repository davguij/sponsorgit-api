/* jshint expr:true */
'use strict';

var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    supertest = require('supertest');

chai.use(sinonChai);
var expect = chai.expect;

describe('basic tests', function() {
    var originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';

    before(function(done) {
        var mycro = require('../../app');
        global._mycro = mycro;
        mycro.start(function(err) {
            if (err) {
                return done(err);
            }
            global.request = supertest.agent(mycro.server);
            done();
        });
    });

    after(function() {
        process.env.NODE_ENV = originalEnv;
    });

    it('should start successfully', function(done) {
        request.get('/healthy')
            .set('accept-version', '^1.0.0')
            .expect(200)
            .expect(function(res) {
                expect(res.body.status).to.equal('healthy');
            })
            .end(done);
    });
});

/* jshint expr:true */
'use strict';

var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    supertest = require('supertest'),
    nock = require('nock');

chai.use(sinonChai);
var expect = chai.expect;

describe('github api tests', function () {
    var originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';

    beforeEach(() => {
        nock('https://api.github.com')
            .get('/search/repositories?sort=updated&q=language%3Ajavascript')
            .replyWithFile(200, __dirname + '/mocks/github-repos.json');
    });

    it('should retrieve repos', function (done) {
        request.get('/repos?lang=javascript')
            .set('accept-version', '^1.0.0')
            .expect(200)
            .expect(function (res) {
                let json = JSON.parse(res.body.data);
                let firstResults = json['items'][0];
                expect(json['items']).to.be.an('array');
                expect(json['items']).to.have.lengthOf(30);
                expect(firstResults).to.be.an('object');
                expect(firstResults.id).to.equal(28457823);
            })
            .end(done);
    });
});

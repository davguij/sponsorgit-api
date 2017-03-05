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
            .get('/search/repositories?sort=updated&q=stars%3A%3E%3D10%20forks%3A%3E%3D3%20language%3Ajavascript%20')
            .replyWithFile(200, __dirname + '/mocks/github-repos.json');
    });

    it('should retrieve repos', function (done) {
        request.get('/repos?lang=javascript')
            .set('accept-version', '^1.0.0')
            .expect(200)
            .expect(function (res) {
                let json = JSON.parse(res.body.data);
                let firstResult = json['data']['items'][0];
                expect(json['data']['items']).to.be.an('array');
                expect(json['data']['items']).to.have.lengthOf(30);
                expect(firstResult).to.be.an('object');
                expect(firstResult.id).to.equal(1663468);
                expect(firstResult.language).to.equal('JavaScript');
            })
            .end(done);
    });
});

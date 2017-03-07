/* jshint expr:true */
'use strict';

var chai = require('chai'),
    sinonChai = require('sinon-chai'),
    supertest = require('supertest'),
    nock = require('nock');

chai.use(sinonChai);
var expect = chai.expect;

describe('github api tests', () => {
    var originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'test';

    beforeEach(() => {
        nock('https://api.github.com')
            .get(/search\/repositories/g)
            .replyWithFile(200, __dirname + '/mocks/github-repos.json');

        nock('https://api.github.com')
            .get(/languages/g)
            .replyWithFile(200, __dirname + '/mocks/github-repo-languages.json');

        nock('https://api.github.com')
            .get(/repos\/angular\/angular/g)
            .replyWithFile(200, __dirname + '/mocks/github-repo-detail.json');
    });

    it('should retrieve repos', (done) => {
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

    it('should retrieve details for a given repo', (done) => {
        request.get('/repos/angular/angular')
            .set('accept-version', '^1.0.0')
            .expect(200)
            .expect(function (res) {
                let json = JSON.parse(res.body.data);
                expect(json['data']).to.be.an('object');
                expect(json['data'].id).to.equal(24195339);
                expect(json['data'].owner.login).to.equal('angular');
            })
            .end(done);
    });

    it('should retrieve languages for a given repo', (done) => {
        request.get('/repos/angular/angular/languages')
            .set('accept-version', '^1.0.0')
            .expect(200)
            .expect(function (res) {
                let json = JSON.parse(res.body.data);
                expect(json['data']).to.be.an('object');
                expect(json['data']['TypeScript']).to.be.a('number');
            })
            .end(done);
    });
});

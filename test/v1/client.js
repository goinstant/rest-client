/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');
var nock = require('nock');

var requestStub = require('../lib/request-stub');
var Client = require('../../lib/v1/client');

describe('API Client v1', function() {
  before(requestStub.before);
  after(requestStub.after);

  describe('when bad credentials are provided to the constructor', function() {
    it('throws an error - client_secret is null', function() {
      var err;
      var client;
      try {
        client = new Client({
          client_id: 'this is valid',
          client_secret: null
        });
      } catch(e) {
        err = e.message;
      }

      assert.equal(err,'access_token, or client_id and client_secret required');
    });
    it('throws an error - client_secret missing', function() {
      var err;
      var client;
      try {
        client = new Client({
          client_id: 'testing'
        });
      } catch(e) {
        err = e.message;
      }

      assert.equal(err,'access_token, or client_id and client_secret required');
    });
    it('throws an error - client_id missing', function() {
      var err;
      var client;
      try {
        client = new Client({
          client_secret: 'testing'
        });
      } catch(e) {
        err = e.message;
      }

      assert.equal(err,'access_token, or client_id and client_secret required');
    });
  });
  describe('when an access token is provided', function() {
    it('errors if not a string', function(done) {
      var err;
      var client;
      try {
        client = new Client({
          client_id: '',
          client_secret: '',
          access_token: new Buffer('WHAT!')
        });
      } catch(e) {
        err = e.message;
      }

      assert.equal(err, 'access_token must be a string');
      done();
    });
    it('stores the access_token on the client object', function(done) {
      var client = new Client({
        access_token: 'access token'
      });

      assert.equal(client.access_token, 'access token');

      done();
    });
  });
  describe('when options are provided', function() {
    it('stores them on the client object', function(done) {
      var opts = {
        client_id: 'id matches',
        client_secret: 'secrets are secret',
        access_token: 'access_token',
        version: 'v4',
        proxy: 'yup'
      };
      var client = new Client(opts);

      assert.equal(client.client_id, opts.client_id);
      assert.equal(client.client_secret, opts.client_secret);
      assert.equal(client.access_token, opts.access_token);
      assert.equal(client.version, opts.version);
      assert.equal(client.proxy, opts.proxy);

      done();
    });
  });
  describe('when already authenticated', function() {
    var client;
    var reqSpy;
    var fakeToken;

    before(function(done) {
      fakeToken = 'hey look i have a token';

      client = new Client({
        client_id: 'this is it',
        client_secret: 'so is this',
        access_token: fakeToken
      });

      reqSpy = sinon.stub(client, '_req').yields(null, {}, {});

      done();
    });

    it('appends a bearer token header', function(done) {
      client.req({
        method: 'GET',
        url: '/not-a-url'
      }, function() {

        var reqOpts = reqSpy.getCall(0).args[0];
        assert.equal(reqOpts.headers.Authorization, 'Bearer ' + fakeToken);

        done();
      });
    });
  });
  describe('when it is not authenticated', function() {
    var client;
    var reqSpy;
    var authSpy;
    var fakeToken;

    before(function(done) {
      client = new Client({
        client_id: 'this is it',
        client_secret: 'so is this'
      });

      fakeToken = {
        access_token: 'yup it happened'
      };

      reqSpy = sinon.stub(client, '_performReq').yields(null, {}, {});
      authSpy = sinon.stub(client, '_authenticate').yields(null, fakeToken);

      done();
    });

    it('performs the authentication step and then the request', function(done) {
      client.req({
        method: 'GET',
        url: '/not-a-real-request'
      }, function() {

        assert.equal(authSpy.callCount, 1);
        assert.equal(reqSpy.getCall(0).args[0].url, '/not-a-real-request');

        done();
      });
    });
  });
  describe('when a response is empty, but valid', function() {
    var client;
    var reqSpy;
    var authSpy;
    var fakeToken;

    before(function() {
      client = new Client({
        client_id: 'this is it',
        client_secret: 'so is this'
      });

      fakeToken = {
        access_token: 'yup it happened'
      };

      reqSpy = sinon.stub(client, '_performReq').yields(null, {
        statusCode: 204,
        body: ''
      }, {});
      authSpy = sinon.stub(client, '_authenticate').yields(null, fakeToken);
    });
    it('provides an empty object', function(done) {
      client.req({
        method: 'GET',
        url: '/devs'
      }, function(err, body) {
        assert.deepEqual(body, {});

        done();
      });
    });
  });
  describe('when a response contains an API error', function() {
    var client;
    var reqSpy;
    var authSpy;
    var fakeToken;
    var validationMessages;

    before(function() {
      client = new Client({
        client_id: 'this is it',
        client_secret: 'so is this'
      });

      fakeToken = {
        access_token: 'yup it happened'
      };

      validationMessages = [
        'Name was invalid',
        'Something else'
      ];

      var body = {
        error: 'Validation failed',
        messages: validationMessages
      };

      reqSpy = sinon.stub(client, '_req').yields(null, {
        statusCode: 400,
        body: body
      }, body);

      authSpy = sinon.stub(client, '_authenticate').yields(null, fakeToken);
    });
    it('error is returned with appropriate properties', function(done) {
      client.req({
        method: 'GET',
        url: '/devs'
      }, function(err) {
        assert.equal(err.message, 'Validation failed');
        assert.deepEqual(err.validation, validationMessages);
        assert.equal(err.statusCode, 400);

        done();
      });
    });
  });
  describe('when a response is valid', function() {
    var client;

    before(function() {
      client = new Client({
        client_id: 'fake client_id',
        client_secret: 'fake client_secret',
        access_token: 'fake access_token'
      });

      nock('https://api.goinstant.net')
        .get('/v1/devs')
        .reply(200, [
          { id: 1 },
          { id: 2 }
        ]);
    });
    it('passes the body and full response to the client', function(done) {
      client.req({
        method: 'GET',
        url: '/devs'
      }, function(err, devs, res) {
        assert.ok(Array.isArray(devs));
        assert.equal(res.statusCode, 200);
        assert.ok(typeof res.headers === 'object');

        done();
      });
    });
  });
});

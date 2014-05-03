/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');

var requestStub = require('../lib/request-stub');
var Version1 = require('../../lib/v1');

describe('Rooms v1', function() {
  var v1;
  var clientSpy;
  before(requestStub.before);
  after(requestStub.after);
  beforeEach(function() {
    v1 = new Version1({
      client_id: 'fake client_id',
      client_secret: 'fake client_secret',
      access_token: 'fake access_token'
    });
    clientSpy = sinon.spy(v1, '_req');
  });
  afterEach(function() {
    v1._req.restore();
  });

  describe('get', function() {
    it('is a GET to /apps/:app/rooms/:room', function(done) {
      v1.apps(1).rooms(1).get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps/1/rooms/1');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).rooms(1).get();
      }, 'Callback is required for get');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.apps(1).rooms(1).get(undefined, function(){});
      }, 'Invalid options supplied to get');
    });
  });
  describe('get all', function() {
    it('is a GET to /apps/:app/rooms with pagination', function(done) {
      v1.apps(1).rooms().get({
        per_page: 4,
        page: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps/1/rooms');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 2
        });

        done();
      });
    });
    it('is a GET to /apps/:app/rooms', function(done) {
      v1.apps(1).rooms().get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps/1/rooms');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).rooms(1).get(undefined, function(){});
      }, 'Invalid options supplied to get');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).rooms().get();
      }, 'Callback is required for get');
    });
  });
  describe('users', function() {
    it('is a GET to /apps/:app/rooms/:room/users with paging', function(done) {
      v1.apps(1).rooms(1).users().get({
        page: 2,
        per_page: 4
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps/1/rooms/1/users');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 2
        });

        done();
      });
    });
    it('is a GET to /apps/:app/rooms/:room/users', function(done) {
      v1.apps(1).rooms(1).users().get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps/1/rooms/1/users');

        done();
      });
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.apps(1).rooms(1).users().get(undefined, function(){});
      }, 'Invalid options supplied to get');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).rooms(1).users().get();
      }, 'Callback is required for get');
    });
  });
  describe('create', function() {
    it('is a POST to /apps/:app/rooms with body', function(done) {
      var opts = {
        name: 'testing'
      };

      v1.apps(1).rooms().create(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.endpoint + '/apps/1/rooms');
        assert.deepEqual(args.body, opts);

        done();
      });
    });
    it('errors with invalid params - invalid properties', function() {
      assert.exception(function() {
        return v1.apps(1).rooms().create('test', function(){});
      }, 'Invalid options supplied to create');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).rooms().create({});
      }, 'Callback is required for create');
    });
  });
});

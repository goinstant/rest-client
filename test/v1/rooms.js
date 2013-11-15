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
    clientSpy = sinon.spy(v1.client, '_performRequest');
  });
  afterEach(function() {
    v1.client._performRequest.restore();
  });

  describe('users', function() {
    it('is a GET to /apps/:id/rooms/:room_id/users', function(done) {
      v1.apps.rooms.users(2, {
        app_id: 1
      }, function() {
        var call = clientSpy.getCall(0) || {};
        if (!call.args) {
          throw new Error('Call was not made.')
        }
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps/1/rooms/2/users');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.rooms.users(1, { app_id: 1 });
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.rooms.get(undefined, {}, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('get', function() {
    it('is a GET to /apps/:id/rooms/:room_id', function(done) {
      v1.apps.rooms.get(2, {
        app_id: 1
      }, function() {
        var call = clientSpy.getCall(0) || {};
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps/1/rooms/2');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.rooms.get(1, { app_id: 1 });
      }, 'Callback must be supplied')
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.rooms.get(undefined, {}, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('all', function() {
    it('is a GET to /apps/:id/rooms', function(done) {
      v1.apps.rooms.all({
        app_id: 1
      }, function() {
        var call = clientSpy.getCall(0) || {};
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps/1/rooms');

        done();
      });
    });
    it('is a GET to /apps/:id/rooms with pagination (legacy naming)',
       function(done) {

      v1.apps.rooms.all({
        app_id: 1,
        pageSize: 5,
        pageNumber: 4,
      }, function() {
        var call = clientSpy.getCall(0) || {};
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps/1/rooms');
        assert.deepEqual(args.qs, {
          per_page: 5,
          page: 4
        });

        done();
      });
    });
    it('is a GET to /apps/:id/rooms with pagination', function(done) {
      v1.apps.rooms.all({
        app_id: 1,
        per_page: 5,
        page: 4
      }, function() {
        var call = clientSpy.getCall(0) || {};
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps/1/rooms');
        assert.deepEqual(args.qs, {
          per_page: 5,
          page: 4
        });

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.rooms.all();
      }, 'Callback must be supplied');
    });
  });
});

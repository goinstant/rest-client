/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');

var requestStub = require('../lib/request-stub');
var Version1 = require('../../lib/v1');

describe('Channels v1', function() {
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

  describe('validation', function() {
    it('errors with invalid opts - no key path', function() {
      assert.exception(function() {
        return v1.channels();
      }, 'Channel path must be supplied');
    });
    it('errors with invalid opts - no opts', function() {
      assert.exception(function() {
        return v1.channels('/my-key/path');
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid opts - no room', function() {
      assert.exception(function() {
        return v1.channels('/my-key/path', {
          app_id: 1
        });
      }, 'Room name or id must be supplied');
    });
    it('errors with invalid opts - no app', function() {
      assert.exception(function() {
        return v1.channels('/my-key/path', {
          room_id: 1
        });
      }, 'App name or id must be supplied');
    });
  });
  describe('message', function() {
    it('is a POST to /channels/:app/:room/:key', function(done) {
      v1.channels('/my/key', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).message(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.endpoint + '/channels/my-app/my-room/my/key');

        done();
      });
    });
    it('is a POST to /channels/:app/:room/:key - root key', function(done) {
      v1.channels('/', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).message(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.endpoint + '/channels/my-app/my-room/');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.channels('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).message();
      }, 'Callback is required for message');
    });
    it('errors with invalid params - bad opts', function() {
      assert.exception(function() {
        return v1.channels('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).message(undefined, function() {});
      }, 'Invalid options supplied to message');
    });
  });
});

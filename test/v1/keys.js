/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');

var requestStub = require('../lib/request-stub');
var Version1 = require('../../lib/v1');

describe('Keys v1', function() {
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
        return v1.keys();
      }, 'Key path must be supplied');
    });
    it('errors with invalid opts - no opts', function() {
      assert.exception(function() {
        return v1.keys('/my-key/path');
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid opts - no room', function() {
      assert.exception(function() {
        return v1.keys('/my-key/path', {
          app_id: 1
        });
      }, 'Room name or id must be supplied');
    });
    it('errors with invalid opts - no app', function() {
      assert.exception(function() {
        return v1.keys('/my-key/path', {
          room_id: 1
        });
      }, 'App name or id must be supplied');
    });
    it('errors with invalid opts - mixed lookup, needs room_id', function() {
      assert.exception(function() {
        return v1.keys('/my-key/path', {
          app_id: 12345,
          room_name: 'my-room-name'
        });
      }, 'Cannot mix types, Room id must be supplied');
    });
    it('errors with invalid opts - mixed lookup, needs room_name', function() {
      assert.exception(function() {
        return v1.keys('/my-key/path', {
          app_name: 'my-app-name',
          room_id: 1234
        });
      }, 'Cannot mix types, Room name must be supplied');
    });
  });
  describe('get', function() {
    it('is a GET to /keys/:app/:room/:key', function(done) {
      v1.keys('/my/key', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/keys/my-app/my-room/my/key');

        done();
      });
    });
    it('is a GET to /keys/:app/:room/:key - root key', function(done) {
      v1.keys('/', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/keys/my-app/my-room/');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.keys('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).get();
      }, 'Callback is required for get');
    });
    it('errors with invalid params - bad opts', function() {
      assert.exception(function() {
        return v1.keys('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).get(undefined, function() {});
      }, 'Invalid options supplied to get');
    });
  });
  describe('update', function() {
    it('is a PUT to /keys/:app/:room/:key', function(done) {
      v1.keys('/my/key', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).update({
        value: {
          data: 'here'
        }
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'PUT');
        assert.equal(args.url, v1.endpoint + '/keys/my-app/my-room/my/key');
        assert.deepEqual(args.body, {
          options: {},
          value: {
            data: 'here'
          }
        });

        done();
      });
    });
    it('is a PUT to /keys/:app/:room/:key - root key', function(done) {
      v1.keys('/', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).update({
        value: {
          data: 'here'
        }
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'PUT');
        assert.equal(args.url, v1.endpoint + '/keys/my-app/my-room/');
        assert.deepEqual(args.body, {
          options: {},
          value: {
            data: 'here'
          }
        });

        done();
      });
    });
    it('errors with invalid params - no value', function() {
      assert.exception(function() {
        return v1.keys('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).update({
          options: {
          }
        }, function() {});
      }, 'Value is required for update');
    });
    it('errors with invalid params - no opts', function() {
      assert.exception(function() {
        return v1.keys('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).update({}, function() {});
      }, 'Invalid options supplied to update');
    });
  });
  describe('remove', function() {
    it('is a DELETE to /keys/:app/:room/:key', function(done) {
      v1.keys('/my/key', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).remove(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.endpoint + '/keys/my-app/my-room/my/key');

        done();
      });
    });
    it('is a DELETE to /keys/:app/:room/:key - root key', function(done) {
      v1.keys('/', {
        app_name: 'my-app',
        room_name: 'my-room'
      }).remove(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.endpoint + '/keys/my-app/my-room/');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.keys('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).remove();
      }, 'Callback is required for remove');
    });
    it('errors with invalid params - bad opts', function() {
      assert.exception(function() {
        return v1.keys('/my-key', {
          app_name: 'my-app',
          room_name: 'my-room'
        }).remove(undefined, function() {});
      }, 'Invalid options supplied to remove');
    });
  });
});

/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');

var requestStub = require('../lib/request-stub');
var Version1 = require('../../lib/v1');

describe('App Login Settings v1', function() {
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

  describe('get', function() {
    it('does a basic GET', function(done) {
      v1.apps.loginSettings.get(42, function() {
        var call = clientSpy.getCall(0) || {};
        if (!call.args) {
          throw new Error('Call was not made.');
        }
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps/42/login-settings');

        done();
      });
    });

    it("complains if the id isn't a number", function() {
      assert.exception(function() {
        return v1.apps.loginSettings.get('fourty-two', function(){});
      }, 'appId parameter must be an integer');
    });

    it("complains if there's no callback", function() {
      assert.exception(function() {
        return v1.apps.loginSettings.get(42);
      }, 'Callback must be supplied');
    });
  });

  function updateOrSetTests(kind, httpMethod) {
    it('does a '+httpMethod, function(done) {
      var changes = { whatever: 'validated server-side' };
      v1.apps.loginSettings[kind](42, changes, function() {
        var call = clientSpy.getCall(0) || {};
        if (!call.args) {
          throw new Error('Call was not made.');
        }
        var args = call.args[0];

        assert.equal(args.method, httpMethod);
        assert.equal(args.url, v1.client.endpoint + '/apps/42/login-settings');
        assert.equal(args.body, '{"whatever":"validated server-side"}');

        done();
      });
    });

    it("complains if the id isn't a number", function() {
      assert.exception(function() {
        return v1.apps.loginSettings[kind]('fourty-two', {}, function(){});
      }, 'appId parameter must be an integer');
    });

    it("complains if there's no callback", function() {
      assert.exception(function() {
        return v1.apps.loginSettings[kind](42, {});
      }, 'Callback must be supplied');
    });

    it("complains if the changes isn't a plain object", function() {
      var expect = kind === 'set' ?
        'Settings must be an object' :
        'Settings changes must be an object';
      assert.exception(function() {
        return v1.apps.loginSettings[kind](42, [], function(){});
      }, expect);
    });
  }

  describe('update', function() {
    updateOrSetTests('update', 'PATCH');
  });

  describe('set', function() {
    updateOrSetTests('set', 'PUT');
  });

});

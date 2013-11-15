/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');

var requestStub = require('../lib/request-stub');
var Version1 = require('../../lib/v1');

describe('Apps v1', function() {
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
    it('is a GET to /apps/:id', function(done) {
      v1.apps.get(1, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps/1');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.get(1);
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.get(undefined, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('all', function() {
    it('is a GET to /apps with pagination', function(done) {
      v1.apps.all({
        per_page: 4,
        page: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 2
        });

        done();
      });
    });
    it('is a GET to /apps with pagination (legacy naming)', function(done) {
      v1.apps.all({
        pageSize: 4,
        pageNumber: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 2
        });

        done();
      });
    });
    it('is a GET to /apps', function(done) {
      v1.apps.all(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/apps');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.all();
      }, 'Callback must be supplied');
    });
  });
  describe('create', function() {
    it('is a POST to /apps with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.apps.update(1, opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.client.endpoint + '/apps/1');
        assert.equal(args.body, JSON.stringify(opts));

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.update(1, 'test', function() {});
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.update(1, 'test', function() {});
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.update(1, { one: 'arg' });
      }, 'Callback must be supplied');
    });
  });
  describe('update', function() {
    it('is a PATCH to /apps/:id with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.apps.update(1, opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.client.endpoint + '/apps/1');
        assert.equal(args.body, JSON.stringify(opts));

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.update(1, 'test', function() {});
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.update(1, { one: 'arg' });
      }, 'Callback must be supplied');
    });
  });
  describe('remove', function() {
    it('is a DELETE to /apps/:id', function(done) {
      v1.apps.remove(1, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.client.endpoint + '/apps/1');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.remove(1);
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.apps.remove(null, function() {});
      }, 'Parameter id must be an integer');
    });
  });
});

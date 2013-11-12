/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');

var requestStub = require('../lib/request-stub');
var Version1 = require('../../lib/v1');

describe('Devs v1', function() {
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
    it('is a GET to /devs/:id', function(done) {
      v1.devs.get(1, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/devs/1');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.get(1);
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.get(undefined, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('all', function() {
    it('is a GET to /devs with query', function(done) {
      v1.devs.all({
        sort: 'display_name',
        fake: 'value'
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/devs');

        done();
      });
    });
    it('is a GET to /devs with pagination (legacy naming)', function(done) {
      v1.devs.all({
        pageSize: 4,
        pageNumber: 3
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/devs');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 3
        });

        done();
      });
    });
    it('is a GET to /devs with pagination', function(done) {
      v1.devs.all({
        per_page: 4,
        page: 3
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/devs');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 3
        });

        done();
      });
    });
    it('is a GET to /devs', function(done) {
      v1.devs.all(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/devs');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.all(null, function() {});
      
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.all();
      }, 'Callback must be supplied');
    });
  });
  describe('update', function() {
    it('is a PATCH to /devs/:id with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.devs.update(1, opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.client.endpoint + '/devs/1');
        assert.equal(args.body, JSON.stringify(opts));

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.update(1, 'test', function() {});
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.update(1, { one: 'property' });
      }, 'Callback must be supplied');
    });
  });
  describe('remove', function() {
    it('is a DELETE to /devs/:id', function(done) {
      v1.devs.remove(1, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.client.endpoint + '/devs/1');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.remove(1);
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.devs.remove(null, function() {});
      }, 'Parameter id must be an integer');
    });
  });
});

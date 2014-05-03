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
    clientSpy = sinon.spy(v1, '_req');
  });
  afterEach(function() {
    v1._req.restore();
  });

  describe('get', function() {
    it('is a GET to /devs/:id', function(done) {
      v1.devs(1).get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/devs/1');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.devs(1).get();
      }, 'Callback is required for get');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.devs().get(undefined, function() {});
      }, 'Invalid options supplied to get');
    });
  });
  describe('get self', function() {
    it('is a GET to /devs/self', function(done) {
      v1.devs('self').get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/devs/self');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.devs(1).get();
      }, 'Callback is required for get');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.devs().get(undefined, function() {});
      }, 'Invalid options supplied to get');
    });
  });
  describe('get all', function() {
    it('is a GET to /devs with pagination', function(done) {
      v1.devs().get({
        per_page: 4,
        page: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/devs');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 2
        });

        done();
      });
    });
    it('is a GET to /devs', function(done) {
      v1.devs().get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/devs');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.devs().get();
      }, 'Callback is required for get');
    });
  });
  describe('create', function() {
    it('is a POST to /devs with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.devs().create(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.endpoint + '/devs');
        assert.deepEqual(args.body, opts);

        done();
      });
    });
    it('errors with invalid params - invalid properties', function() {
      assert.exception(function() {
        return v1.devs().create('test', function() {});
      }, 'New properties are required for create');
    });
    it('errors with invalid params - no properties', function() {
      assert.exception(function() {
        return v1.devs().create({}, function() {});
      }, 'New properties are required for create');
    });
    it('errors with invalid params - id added', function() {
      assert.exception(function() {
        return v1.devs(1).create({}, function() {});
      }, 'Cannot create dev with specific id');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.devs().create({ one: 'arg' });
      }, 'Callback is required for create');
    });
  });
  describe('update', function() {
    it('is a PATCH to /devs/:id with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.devs(1).update(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.endpoint + '/devs/1');
        assert.deepEqual(args.body, opts);

        done();
      });
    });
    it('errors with invalid params - invalid properties', function() {
      assert.exception(function() {
        return v1.devs(1).update(null, function() {});
      }, 'New properties are required for update');
    });
    it('errors with invalid params - no properties', function() {
      assert.exception(function() {
        return v1.devs(1).update({}, function() {});
      }, 'New properties are required for update');
    });
    it('errors with invalid params - no dev', function() {
      assert.exception(function() {
        return v1.devs().update({ name: 'new one' }, function() {});
      }, 'Dev identity required for update');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.devs(1).update({ one: 'arg' });
      }, 'Callback is required for update');
    });
  });
  describe('remove', function() {
    it('is a DELETE to /devs/:id', function(done) {
      v1.devs(1).remove(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.endpoint + '/devs/1');

        done();
      });
    });
    it('errors with invalid params - no dev', function() {
      assert.exception(function() {
        return v1.devs().remove(function() {});
      }, 'Dev identity required for remove');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.devs(1).remove(undefined, function() {});
      }, 'Invalid options supplied to remove');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.devs(1).remove();
      }, 'Callback is required for remove');
    });
  });
});

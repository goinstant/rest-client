/*jshint node:true*/
'use strict';

var assert = require('goinstant-assert');
var sinon = require('sinon');

var requestStub = require('../lib/request-stub');
var Version1 = require('../../lib/v1');

describe('Teams v1', function() {
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
    it('is a GET to /teams/:id', function(done) {
      v1.teams.get(1, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/teams/1');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.get(1);
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.get(undefined, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('all', function() {
    it('is a GET to /teams', function(done) {
      v1.teams.all(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/teams');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        v1.teams.all();
      }, 'Callback must be supplied');
    });
  });
  describe('create', function() {
    it('is a POST to /teams with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.teams.update(1, opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.client.endpoint + '/teams/1');
        assert.equal(args.body, JSON.stringify(opts));

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.update(1, 'test', function() {});
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.update(1, 'test', function() {});
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.update(1, { one: 'arg' });
      }, 'Callback must be supplied');
    });
  });
  describe('update', function() {
    it('is a PATCH to /teams/:id with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.teams.update(1, opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.client.endpoint + '/teams/1');
        assert.equal(args.body, JSON.stringify(opts));

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        v1.teams.update(1, 'test', function() {});
      }, 'Parameter opts must be an object');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        v1.teams.update(1, { one: 'arg' });
      }, 'Callback must be supplied');
    });
  });
  describe('remove', function() {
    it('is a DELETE to /teams/:id', function(done) {
      v1.teams.remove(1, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.client.endpoint + '/teams/1');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        v1.teams.remove(1);
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        v1.teams.remove(null, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('devs.add', function() {
    it('is a POST to /teams/:id/devs', function(done) {
      v1.teams.devs.add(1, {
        developer_id: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.client.endpoint + '/teams/1/devs');
        assert.equal(args.body, '{"developer":2}');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        v1.teams.devs.add(1, {
          developer_id: 2
        });
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        v1.teams.devs.add(null, null, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('devs.remove', function() {
    it('is a DELETE to /teams/:id/devs/:dev', function(done) {
      v1.teams.devs.remove(1, {
        developer_id: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.client.endpoint + '/teams/1/devs/2');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.devs.remove(1, {
          developer_id: 2
        });
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.devs.remove(null, null, function() {});
      }, 'Parameter id must be an integer');
    });
  });
  describe('devs.all', function() {
    it('is a GET to /teams/:id/devs', function(done) {
      v1.teams.devs.all(1, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/teams/1/devs');

        done();
      });
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.devs.all(1);
      }, 'Callback must be supplied');
    });
    it('errors with invalid params', function() {
      assert.exception(function() {
        return v1.teams.devs.remove('not a number', function() { });
      }, 'Parameter id must be an integer');
    });
  });
});

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
    clientSpy = sinon.spy(v1, '_req');
  });
  afterEach(function() {
    v1._req.restore();
  });

  describe('get', function() {
    it('is a GET to /apps/:id', function(done) {
      v1.apps(1).get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps/1');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).get();
      }, 'Callback is required for get');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.apps().get(undefined, function() {});
      }, 'Invalid options supplied to get');
    });
  });
  describe('get all', function() {
    it('is a GET to /apps with pagination', function(done) {
      v1.apps().get({
        per_page: 4,
        page: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 2
        });

        done();
      });
    });
    it('is a GET to /apps', function(done) {
      v1.apps().get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/apps');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps().get();
      }, 'Callback is required for get');
    });
  });
  describe('create', function() {
    it('is a POST to /apps with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.apps().create(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.endpoint + '/apps');
        assert.deepEqual(args.body, opts);

        done();
      });
    });
    it('errors with invalid params - invalid properties', function() {
      assert.exception(function() {
        return v1.apps().create('test', function() {});
      }, 'New properties are required for create');
    });
    it('errors with invalid params - no properties', function() {
      assert.exception(function() {
        return v1.apps().create({}, function() {});
      }, 'New properties are required for create');
    });
    it('errors with invalid params - id added', function() {
      assert.exception(function() {
        return v1.apps(1).create({}, function() {});
      }, 'Cannot create app with specific id');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps().create({ one: 'arg' });
      }, 'Callback is required for create');
    });
  });
  describe('update', function() {
    it('is a PATCH to /apps/:id with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.apps(1).update(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.endpoint + '/apps/1');
        assert.deepEqual(args.body, opts);

        done();
      });
    });
    it('errors with invalid params - invalid properties', function() {
      assert.exception(function() {
        return v1.apps(1).update(null, function() {});
      }, 'New properties are required for update');
    });
    it('errors with invalid params - no properties', function() {
      assert.exception(function() {
        return v1.apps(1).update({}, function() {});
      }, 'New properties are required for update');
    });
    it('errors with invalid params - no app', function() {
      assert.exception(function() {
        return v1.apps().update({ name: 'new one' }, function() {});
      }, 'App identity required for update');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).update({ one: 'arg' });
      }, 'Callback is required for update');
    });
  });
  describe('remove', function() {
    it('is a DELETE to /apps/:id', function(done) {
      v1.apps(1).remove(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.endpoint + '/apps/1');

        done();
      });
    });
    it('errors with invalid params - no app', function() {
      assert.exception(function() {
        return v1.apps().remove(function() {});
      }, 'App identity required for remove');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.apps(1).remove(undefined, function() {});
      }, 'Invalid options supplied to remove');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.apps(1).remove();
      }, 'Callback is required for remove');
    });
  });
  describe('auth settings', function() {
    describe('get', function() {
      it('is a GET to /apps/:id/auth-settings', function(done) {
        v1.apps(1).authSettings().get(function() {
          var call = clientSpy.getCall(0);
          var args = call.args[0];

          assert.equal(args.method, 'GET');
          assert.equal(args.url, v1.endpoint + '/apps/1/auth-settings');

          done();
        });
      });
      it('errors with invalid params - no app', function() {
        assert.exception(function() {
          return v1.apps().authSettings().get(function() {});
        }, 'App identity required for auth settings');
      });
      it('errors with invalid params - no callback', function() {
        assert.exception(function() {
          return v1.apps(1).authSettings().get();
        }, 'Callback is required for get');
      });
      it('errors with invalid params - bad query params', function() {
        assert.exception(function() {
          return v1.apps(1).authSettings().get(undefined, function() {});
        }, 'Invalid options supplied to get');
      });
    });
    describe('update', function() {
      it('is a PATCH to /apps/:id/auth-settings', function(done) {
        v1.apps(1).authSettings().update({
          partial: true
        }, function() {
          var call = clientSpy.getCall(0);
          var args = call.args[0];

          assert.equal(args.method, 'PATCH');
          assert.equal(args.url, v1.endpoint + '/apps/1/auth-settings');
          assert.deepEqual(args.body, {
            partial: true
          });

          done();
        });
      });
      it('errors with invalid params - no app', function() {
        assert.exception(function() {
          return v1.apps().authSettings().update(function() {});
        }, 'App identity required for auth settings');
      });
      it('errors with invalid params - no callback', function() {
        assert.exception(function() {
          return v1.apps(1).authSettings().update();
        }, 'Callback is required for update');
      });
      it('errors with invalid params - bad body params', function() {
        assert.exception(function() {
          return v1.apps(1).authSettings().update(undefined, function() {});
        }, 'Invalid options supplied to update');
      });
    });
    describe('set', function() {
      it('is a PUT to /apps/:id/auth-settings', function(done) {
        v1.apps(1).authSettings().set({
          partial: false
        }, function() {
          var call = clientSpy.getCall(0);
          var args = call.args[0];

          assert.equal(args.method, 'PUT');
          assert.equal(args.url, v1.endpoint + '/apps/1/auth-settings');
          assert.deepEqual(args.body, {
            partial: false
          });

          done();
        });
      });
      it('errors with invalid params - no app', function() {
        assert.exception(function() {
          return v1.apps().authSettings().set(function() {});
        }, 'App identity required for auth settings');
      });
      it('errors with invalid params - no callback', function() {
        assert.exception(function() {
          return v1.apps(1).authSettings().set();
        }, 'Callback is required for set');
      });
      it('errors with invalid params - bad body params', function() {
        assert.exception(function() {
          return v1.apps(1).authSettings().set(undefined, function() {});
        }, 'Invalid options supplied to set');
      });
    });
  });
});

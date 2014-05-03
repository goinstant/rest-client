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
    clientSpy = sinon.spy(v1, '_req');
  });
  afterEach(function() {
    v1._req.restore();
  });

  describe('get', function() {
    it('is a GET to /teams/:id', function(done) {
      v1.teams(1).get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/teams/1');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.teams(1).get();
      }, 'Callback is required for get');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.teams().get(undefined, function() {});
      }, 'Invalid options supplied to get');
    });
  });
  describe('get all', function() {
    it('is a GET to /teams with pagination', function(done) {
      v1.teams().get({
        per_page: 4,
        page: 2
      }, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/teams');
        assert.deepEqual(args.qs, {
          per_page: 4,
          page: 2
        });

        done();
      });
    });
    it('is a GET to /teams', function(done) {
      v1.teams().get(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.endpoint + '/teams');

        done();
      });
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.teams().get();
      }, 'Callback is required for get');
    });
  });
  describe('create', function() {
    it('is a POST to /teams with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.teams().create(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.endpoint + '/teams');
        assert.deepEqual(args.body, opts);

        done();
      });
    });
    it('errors with invalid params - invalid properties', function() {
      assert.exception(function() {
        return v1.teams().create('test', function() {});
      }, 'New properties are required for create');
    });
    it('errors with invalid params - no properties', function() {
      assert.exception(function() {
        return v1.teams().create({}, function() {});
      }, 'New properties are required for create');
    });
    it('errors with invalid params - id added', function() {
      assert.exception(function() {
        return v1.teams(1).create({}, function() {});
      }, 'Cannot create team with specific id');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.teams().create({ one: 'arg' });
      }, 'Callback is required for create');
    });
  });
  describe('update', function() {
    it('is a PATCH to /teams/:id with body', function(done) {
      var opts = {
        display_name: 'Testing'
      };

      v1.teams(1).update(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'PATCH');
        assert.equal(args.url, v1.endpoint + '/teams/1');
        assert.deepEqual(args.body, opts);

        done();
      });
    });
    it('errors with invalid params - invalid properties', function() {
      assert.exception(function() {
        return v1.teams(1).update(null, function() {});
      }, 'New properties are required for update');
    });
    it('errors with invalid params - no properties', function() {
      assert.exception(function() {
        return v1.teams(1).update({}, function() {});
      }, 'New properties are required for update');
    });
    it('errors with invalid params - no team', function() {
      assert.exception(function() {
        return v1.teams().update({ name: 'new one' }, function() {});
      }, 'Team identity required for update');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.teams(1).update({ one: 'arg' });
      }, 'Callback is required for update');
    });
  });
  describe('remove', function() {
    it('is a DELETE to /teams/:id', function(done) {
      v1.teams(1).remove(function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];
      
        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.endpoint + '/teams/1');

        done();
      });
    });
    it('errors with invalid params - no team', function() {
      assert.exception(function() {
        return v1.teams().remove(function() {});
      }, 'Team identity required for remove');
    });
    it('errors with invalid params - bad query params', function() {
      assert.exception(function() {
        return v1.teams(1).remove(undefined, function() {});
      }, 'Invalid options supplied to remove');
    });
    it('errors with invalid params - no callback', function() {
      assert.exception(function() {
        return v1.teams(1).remove();
      }, 'Callback is required for remove');
    });
  });
  describe('devs', function() {
    describe('get all', function() {
      it('is a GET to /teams/:team/devs with pagination', function(done) {
        v1.teams(1).devs().get({
          per_page: 4,
          page: 2
        }, function() {
          var call = clientSpy.getCall(0);
          var args = call.args[0];

          assert.equal(args.method, 'GET');
          assert.equal(args.url, v1.endpoint + '/teams/1/devs');
          assert.deepEqual(args.qs, {
            per_page: 4,
            page: 2
          });

          done();
        });
      });
      it('is a GET to /teams/:team/devs', function(done) {
        v1.teams(1).devs().get(function() {
          var call = clientSpy.getCall(0);
          var args = call.args[0];

          assert.equal(args.method, 'GET');
          assert.equal(args.url, v1.endpoint + '/teams/1/devs');

          done();
        });
      });
      it('errors with invalid params - no callback', function() {
        assert.exception(function() {
          return v1.teams(1).devs().get();
        }, 'Callback is required for get');
      });
    });
    describe('remove', function() {
      it('is a DELETE to /teams/:team/devs/:id', function(done) {
        v1.teams(1).devs(2).remove(function() {
          var call = clientSpy.getCall(0);
          var args = call.args[0];
        
          assert.equal(args.method, 'DELETE');
          assert.equal(args.url, v1.endpoint + '/teams/1/devs/2');

          done();
        });
      });
      it('errors with invalid params - no dev', function() {
        assert.exception(function() {
          return v1.teams(1).devs().remove(function() {});
        }, 'Developer identity required for remove');
      });
      it('errors with invalid params - bad query params', function() {
        assert.exception(function() {
          return v1.teams(1).devs(2).remove(undefined, function() {});
        }, 'Invalid options supplied to remove');
      });
      it('errors with invalid params - no callback', function() {
        assert.exception(function() {
          return v1.teams(1).devs(2).remove();
        }, 'Callback is required for remove');
      });
    });
    describe('add', function() {
      it('is a POST to /teams/:team/devs', function(done) {
        v1.teams(1).devs().add({
          id: 2
        }, function() {
          var call = clientSpy.getCall(0);
          var args = call.args[0];
        
          assert.equal(args.method, 'POST');
          assert.equal(args.url, v1.endpoint + '/teams/1/devs');
          assert.deepEqual(args.body, { id: 2 });

          done();
        });
      });
      it('errors with invalid params - no id', function() {
        assert.exception(function() {
          return v1.teams(1).devs().add(function() {});
        }, 'Property id required for add');
      });
      it('errors with invalid params - bad query params', function() {
        assert.exception(function() {
          return v1.teams(1).devs().add(undefined, function() {});
        }, 'Invalid options supplied to add');
      });
      it('errors with invalid params - no callback', function() {
        assert.exception(function() {
          return v1.teams(1).devs(2).add();
        }, 'Developer id must be passed to add');
      });
      it('errors with invalid params - no callback', function() {
        assert.exception(function() {
          return v1.teams(1).devs().add();
        }, 'Callback is required for add');
      });
    });
  });
});

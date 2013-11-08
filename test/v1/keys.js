/* jshint node: true */
'use strict';

var assert = require('gi-assert');
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
    clientSpy = sinon.spy(v1.client, '_performRequest');
  });
  afterEach(function() {
    v1.client._performRequest.restore();
  });

  describe('get', function() {
    describe('errors', function() {
      it('when no callback is supplied', function() {
        assert.exception(function() {
          return v1.keys.get({

          }, 'haha im not a function');
        }, 'Callback must be supplied');
      });

      it('when no options are supplied', function() {
        assert.exception(function() {
          return v1.keys.get(null, function() {});
        }, 'Parameter opts must be an object');
      });

      it('when no app is supplied', function() {
        assert.exception(function() {
          return v1.keys.get({room_id: 'yes'}, function() {});
        }, 'Opts property app_id must be a string or integer');
      });

      it('when no room is supplied', function() {
        assert.exception(function() {
          return v1.keys.get({app_id: 'haha' }, function() {});
        }, 'Opts property room_id must be a string or integer');
      });
      it('when no key is supplied', function() {
        assert.exception(function() {
          return v1.keys.get({app_id: 'haha', room_id: 'hehe'}, function() {});
        }, 'Opts property key must be a string or integer');
      });
    });

    it('is a GET to /keys/:app/:room/:key', function(done) {
      var opts = {
        app_id: 23,
        room_id: 22,
        key: 'mykey'
      };

      v1.keys.get(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'GET');
        assert.equal(args.url, v1.client.endpoint + '/keys/23/22/mykey');

        done();
      });
    });
  });

  describe('remove', function() {
    it('is a DELETE to /keys/:app/:room/:key', function(done) {
      var opts = {
        app_id: 23,
        room_id: 22,
        key: 'mykey'
      };

      v1.keys.remove(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'DELETE');
        assert.equal(args.url, v1.client.endpoint + '/keys/23/22/mykey');

        done();
      });
    });
  });

  describe('update', function() {
    it('throws if you do not pass a value', function() {
      assert.exception(function() {
        return v1.keys.update({app_id: 22, room_id: 23, key: 'meow'},
          function() {}
        );
      }, 'Options[value] must be provided');
    });

    it('allows optional options', function(done) {
      var opts = {
        app_id: 23,
        room_id: 22,
        key: 'mykey',
        value: 'whocares'
      };

      v1.keys.update(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'PUT');
        assert.equal(args.url, v1.client.endpoint + '/keys/23/22/mykey');
        assert.equal(args.body, JSON.stringify({value: 'whocares'}));

        done();
      });
    });

    it('is a PUT to /keys/:app/:room/:key', function(done) {
      var opts = {
        app_id: 23,
        room_id: 22,
        key: 'mykey',
        value: 'whocares',
        options: {
          expiry: 3000, cascade: 'haha/this/key/is/not/real'
        }
      };

      v1.keys.update(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'PUT');
        assert.equal(args.url, v1.client.endpoint + '/keys/23/22/mykey');
        assert.equal(args.body,
          JSON.stringify({
            value: 'whocares',
            options: {
              expiry: 3000, cascade: 'haha/this/key/is/not/real'
            }
          }
        ));

        done();
      });
    });
  });
  describe('accepts strings', function() {
    function test(cmd) {
      it(cmd + ' can still request fine', function(done) {
        var opts = {
          app_id: 'appy',
          room_id: 'myroom',
          key: 'mykey'
        };

        if (cmd === 'update') {
          opts.value = 'whocares';
        }

        v1.keys[cmd](opts, function() {
          var call = clientSpy.getCall(0) || {};
          var args = call.args[0];

          var dict = {
            'get': 'GET',
            'remove': 'DELETE',
            'update': 'PUT'
          };

          assert.equal(args.method, dict[cmd]);
          assert.equal(args.url, v1.client.endpoint + '/keys/appy/myroom/mykey');

          done();
        });
      });
    }

    test('get');
    test('update');
    test('remove');
  });
});

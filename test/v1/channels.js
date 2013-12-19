/* jshint node: true */
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
    clientSpy = sinon.spy(v1.client, '_performRequest');
  });
  afterEach(function() {
    v1.client._performRequest.restore();
  });

  describe('message', function() {
    it('throws if you do not pass a value', function() {
      assert.exception(function() {
        return v1.channels.message({app_id: 22, room_id: 23, channel: 'meow'},
          function() {}
        );
      }, 'Options[value] must be provided');
    });

    it('throws if options is not an object', function() {
      assert.exception(function() {
        return v1.channels.message('I am not an object',
          function() {}
        );
      }, 'Parameter opts must be an object');
    });

    it('throws if callback is not a function', function() {
      assert.exception(function() {
        return v1.channels.message({app_id: 22, room_id: 23, channel: 'meow'},
          'I am not a function'
        );
      }, 'Callback must be supplied');
    });

    it('is a POST to /channels/:app/:room/:channel', function(done) {
      var opts = {
        app_id: 23,
        room_id: 22,
        channel: 'mychannel',
        value: 'whocares'
      };

      v1.channels.message(opts, function() {
        var call = clientSpy.getCall(0);
        var args = call.args[0];

        assert.equal(args.method, 'POST');
        assert.equal(args.url, v1.client.endpoint + '/channels/23/22/mychannel');
        assert.equal(args.body,
          JSON.stringify({
            value: 'whocares'
          }
        ));

        done();
      });
    });
  });
});

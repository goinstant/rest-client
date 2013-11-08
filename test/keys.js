/* jshint node: true */
'use strict';

var sinon = require('sinon');

var Keys = require('../lib/v1/keys');

describe('Keys v1', function() {
  var keys;
  var sandbox;
  var mockClient;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    mockClient = {
      req: sinon.stub().yields(null)
    };
    keys = new Keys(mockClient);
  });

  afterEach(function() {
    sandbox.restore();
    keys = null;
  });

  it('accepts nested keys', function(done) {
    sandbox.stub(keys, 'req').yields(null);

    var opts = {
      app_id: 'meme',
      room_id: 'haha',
      key: 'i/am/nested'
    };

    keys.get(opts, function(err) {
      if (err) {
        return done(err);
      }

      sinon.assert.calledOnce(keys.req);
      sinon.assert.calledWith(keys.req,
        { method: 'GET', url: '/keys/meme/haha/i/am/nested' });

      done();
    });
  });
});

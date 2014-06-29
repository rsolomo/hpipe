'use strict'

var sinon = require('sinon')
var sse = require('../lib/serversentevents')

describe('serversentevents', function() {
  it('should convert chunks to sse', function() {
    var transform = sse()
    var callback = sinon.stub()
    var push = transform.push = sinon.stub()
    var expected = ''
      + 'event:input\n'
      + 'id:0\n'
      + 'data:something\n'
      + '\n\n'

    transform._transform(new Buffer('something'), null, callback)

    sinon.assert.calledOnce(push)
    sinon.assert.calledWithExactly(push, expected)
    sinon.assert.calledOnce(callback)
  })
})

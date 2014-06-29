'use strict'

var util = require('util')
var Transform = require('stream').Transform

module.exports = function(options) {
  return new ServerSentEvents(options)
}

function ServerSentEvents(options) {
  this._id = 0
  Transform.call(this, options)
}

util.inherits(ServerSentEvents, Transform)

ServerSentEvents.prototype._transform = function(chunk, encoding, callback) {
  var s = 'event:input\n'
    + 'id:' + (this._id++) + '\n'
    + 'data:' + chunk + '\n'
    + '\n\n'

  this.push(s)
  callback()
}

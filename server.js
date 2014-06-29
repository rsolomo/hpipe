'use strict'

var http = require('http')
var listener = require('./lib/listener')

module.exports = function(readable, options) {
  var server = http.createServer(listener(readable))
  server.listen(options.port, options.ip)
  return server
}

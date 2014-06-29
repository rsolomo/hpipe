'use strict'

var path = require('path')
var byline = require('byline')
var nstatic = require('node-static')
var sse = require('./serversentevents')

var fileServer = new nstatic.Server(path.resolve(__dirname, '../static'))

module.exports = function(readable) {
  var lineStream = byline.createStream(readable)
  var endFalse = {end: false}
  var header = {'Content-Type': 'text/event-stream'}

  return function(req, res) {
    req.addListener('end', onEnd).resume()

    function onEnd() {
      if (req.url === '/events') serveEvents(req, res)
      else fileServer.serve(req, res)
    }
  }

  function serveEvents(req, res) {
    res.writeHead(200, header)
    res.setTimeout(0)
    lineStream.pipe(sse(), endFalse).pipe(res)
  }
}

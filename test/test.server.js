'use strict'

var assert = require('assert')
var http = require('http')
var stream = require('stream')
var server = require('../server')

describe('server', function() {
  var sockets, _server, readable
  before(function(done) {
    // mock readable
    readable = new stream.Readable()
    readable._read = function() {
      setTimeout(function() {
        readable.push('something\n')
      }, 100)
    }

    _server = server(readable, {port: 8001, ip: '127.0.0.1'})
    sockets = []
    _server.on('connection', function(socket) {
      sockets.push(socket)
    })
    _server.once('listening', done)
  })
  after(function(done) {
    sockets.forEach(function(socket) {
      socket.destroy()
    })
    _server.close(done)
  })
  it('should return 404 for invalid URLs', function(done) {
    http.get('http://127.0.0.1:8001/badurl', function(res) {
      assert.equal(res.statusCode, 404)
      done()
    }).on('error', done)
  })
  it('should send ServerSentEvents', function(done) {
    http.request('http://127.0.0.1:8001/events', onRequest).end()

    function onRequest(res) {
      assert.equal(res.statusCode, 200)
      assert.equal(res.headers['content-type'], 'text/event-stream')

      res.on('data', onData)
    }

    function onData(chunk) {
      var string = chunk.toString()
      assert.notEqual(string.indexOf('event:input'), -1)
      assert.notEqual(string.indexOf('id:'), -1)
      assert.notEqual(string.indexOf('data:something\n'), -1)
      assert.notEqual(string.indexOf('\n\n'), -1)
      done()
    }
  })
})

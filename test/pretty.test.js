'use strict'

var test = require('tap').test
var pino = require('../')
var os = require('os')
var split = require('split2')
var hostname = os.hostname()

test('pino transform', function (t) {
  t.plan(4)
  var pretty = pino.pretty()
  pretty.pipe(split(function (line) {
    t.ok(line.match(/.*hello world$/), 'end of line matches')
    t.ok(line.match(/.*INFO.*/), 'includes level')
    t.ok(line.indexOf('' + process.pid) > 0, 'includes pid')
    t.ok(line.indexOf('' + hostname) > 0, 'includes hostname')
    return line
  }))
  var instance = pino(pretty)

  instance.info('hello world')
})

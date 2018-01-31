'use strict'

const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const Emitter = require('tiny-emitter')

const defaultOpts = { baudRate: 9600 }

module.exports = function (address, opts) {
  opts = Object.assign({}, defaultOpts, opts || {})

  const events = new Emitter()
  const port = new SerialPort(address, { baudRate: opts.baudRate, autoOpen: false })
  const parser = port.pipe(new Readline({ delimiter: '\n' }))

  port.on('error', err => events.emit('error', err))
  parser.on('data', data => events.emit('data', data))

  const api = {
    on: events.on.bind(events),
    once: events.once.bind(events),
    off: events.off.bind(events),
    waitfor: event => new Promise((resolve, reject) => { events.once(event, resolve) }),
    connect: () => new Promise((resolve, reject) => {
      port.open(err => err ? reject(err) : resolve())
    })
  }

  return api
}

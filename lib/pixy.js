'use strict'

const { config } = require('./../main.config')
const Emitter = require('tiny-emitter')
const Arduino = require('./arduino')

const arduino = Arduino(config.pixy.address)
const events = new Emitter()

/**
 * Transform string with the signature
 * "sig: 1 x: 117 y: 138 width: 60 height: 41"
 * to a valid js object
 */
function parsePixyObject (data) {
  const obj = {}
  const splitted = data.split(/:? /)
  splitted.forEach((v, i) => {
    if (i & 1) obj[splitted[i - 1]] = +splitted[i]
  })
  return obj
}

arduino.on('error', err => events.emit('error', err))
arduino.on('data', data => {
  const obj = parsePixyObject(data)
  if (obj && obj.sig && obj.x && obj.y && obj.width && obj.height) {
    events.emit('object', obj)
  }
})

module.exports = {
  ...config.pixy,
  connect: arduino.connect,
  on: events.on.bind(events),
  once: events.once.bind(events),
  off: events.off.bind(events),
  waitfor: event => new Promise((resolve, reject) => { events.once(event, resolve) })
}

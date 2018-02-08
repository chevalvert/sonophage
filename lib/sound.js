'use strict'

const osc = require('osc')
const { config, log } = require('./../main.config.js')

let isOpen = false
let udpPort
let reconnectionAttempts = 0

function reconnect () {
  return new Promise ((resolve, reject) => {
    log.info('Connecting sound UDP...')

    udpPort && close()

    udpPort = new osc.UDPPort({
      // SEE: https://github.com/colinbdclark/osc.js/issues/83#issuecomment-290567155
      localAddress: config.sound_udp.local,
      remoteAddress: config.sound_udp.remote,
      remotePort: config.sound_udp.port,
      metadata: true
    })

    udpPort.on('ready', () => {
      isOpen = true
      log.info('Sound UDP is ready on port ' + config.sound_udp.port)
      resolve()
    })

    udpPort.on('close', (data) => {
      isOpen = false
      log.info('Sound UDP has been closed')
    })

    udpPort.on('error', (err) => {
      if (err) {
        isOpen = false
        log.error(err)
        if (reconnectionAttempts < config.sound_udp.reconnection.attempts) {
          if (err.code === 'EHOSTUNREACH' || err.code === 'EHOSTDOWN') {
            setTimeout(() => {
              reconnectionAttempts++
              reconnect()
            }, config.sound_udp.reconnection.delay)
          }
        }
      }
    })

    udpPort.open()
  })
}

function close () {
  udpPort && udpPort.close()
}

function findType (value) {
  const isInt = n => n % 1 === 0
  return isInt(value) ? 'i' : 'f'
}

module.exports = {
  connect: reconnect,
  get open() { return isOpen },
  send: (address, values = [0]) => {
    if (isOpen) {
      /**
       * message = {
       *   address: '/varName',
       *   args: [
       *     { type: 'i', value: 100 }
       *     { type: 'f', value: 1.0 }
       *   ]
       * }
       */
      values = Array.isArray(values) ? values : [values]
      udpPort.send({
        address,
        args: values.filter(v => v !== undefined).map(value => {
          const type = findType(value)
          if (type === 'f') value = value.toFixed(config.sound_udp.floatDecimals)
          return { value, type }
        })
      })
    }
  }
}

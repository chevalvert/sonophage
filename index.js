#!/usr/bin/env node
'use strict'

process.title = 'sonophage'
const pixy = require('./lib/pixy')
const sound = require('./lib/sound')
const { normalize } = require('missing-math')
const { config, log, version } = require('./main.config')

log.info(process.title + ' v' + version)
pixy.on('error', err => log.error(err))

pixy
.connect()
.then(() => log.info('PixyCam connected'))
.then(() => sound.connect())
.then(start)
.catch(err => log.error(err))

function start () {
  pixy.on('object', object => {
    const x = normalize(object.x + object.width / 2, 0, config.pixy.width)
    const note = [
      config.notes[Math.floor(x * config.notes.length)],
      config.note.velocity,
      config.note.duration
    ]

    log.debug(note, object)
    sound.send('/instrument-' + object.sig, note)
  })
}

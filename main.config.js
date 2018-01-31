const path = require('path')
const fs = require('fs')

/**
 * Project paths
 */

const paths = {
  root: path.join(__dirname),
  lib: path.join(__dirname, 'lib'),
  utils: path.join(__dirname, 'lib', 'utils'),
  animations: path.join(__dirname, 'animations')
}

/**
 * Version
 */

const version = require(path.join(paths.root, 'package.json')).version

/**
 * CLI args
 */

const minimist = require('minimist')
const minimistOpts = {
  boolean: [
    'help',
    'version'
  ],
  string: ['log', 'log-level'],
  alias: {
    help: ['h'],
    log: [],
    'log-level': [],
    version: ['v']
  },
  default: {
    'log-level': 6
  }
}

const argv = minimist(process.argv.slice(2), minimistOpts)

if (argv.help) {
  console.log(fs.readFileSync(path.join(paths.root, 'USAGE'), 'utf-8'))
  process.exit(0)
}

if (argv.version) {
  console.log(version)
  process.exit(0)
}

const args = {}
Object.keys(minimistOpts.alias).forEach(key => {
  if (
  argv.hasOwnProperty(key) !== undefined && typeof argv[key] !== 'undefined'
  ) {
    args[key] = argv[key]
  }
})

/**
 * Logging system
 */

const Log = require('log')
const stream = args.log
  ? fs.createWriteStream(args.log)
  : null
const logLevel = isNaN(args['log-level'])
  ? args['log-level']
  : parseInt(args['log-level'])
const log = new Log(logLevel, stream)

/**
 * Config
 */

const config = require('./sonophage.config.json')

module.exports = {
  paths,
  args,
  log,
  config,
  version,
  env: process.env.NODE_ENV || 'production'
}

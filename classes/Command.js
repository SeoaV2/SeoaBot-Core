const path = require('path')

/**
 * Basic Command Class
 */
class Command {
  constructor () {
    this.name = ''
    this.description = ''
    this.aliases = []
    this.clientPerms = []
    this.userPerms = []
    this.ownerOnly = false
    this._group = ''
    this._path = ''
  }

  /**
   * Run Command Module File
   * @param {import('./SeoaClient')} _seoa discord.js Client
   * @param {import('discord.js').Message} _msg discord.js Message
   * @param {import('./Querys')} _query Arguments
   * @param {String} _locale Guild Locale Data (from DB)
   */
  run (_seoa, _msg, _query, _locale) {
    throw new Error('run() function not provided')
  }

  /**
   * Reload Command Module File
   * @param {import('./SeoaClient')} seoa discord.js Client
   */
  reload (seoa) {
    const cmdPath = path.join(seoa._path, this._group, this.name + '.js')
    // const oldCmd = require.cache[cmdPath]
    delete require.cache[cmdPath]
    const newCmd = require(cmdPath)

    seoa.commands.reregister(newCmd, this)
  }

  /**
   * Unload Command Module File
   * @param {import('./SeoaClient')} seoa discord.js Client
   */
  unload (seoa) {
    const cmdPath = path.join(seoa._path, this._group, this.name + '.js')
    delete require.cache[cmdPath]
    seoa.commands.unregister(this)
  }
}

module.exports = Command

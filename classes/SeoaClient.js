const { Client } = require('discord.js')
const { existsSync } = require('fs')
const path = require('path').resolve()
const i18n = require('i18n')

class SeoaClient extends Client {
  constructor () {
    super()

    let settings
    if (existsSync(path + '/settings.json')) settings = require(path + '/settings.json')
    else settings = { prefix: 'b>', owner: [] }
    this.token = process.env.SeoaToken || settings.token
    this.prefix = process.env.SeoaPrefix || settings.prefix
    this.owner = process.env.SeoaOwner || settings.owner
  }

  start () {
    this.login(this.token)
  }

  restart () {
    this.destroy()
    setTimeout(() => {
      this.start()
    }, 3000)
  }

  initLocale () {
    i18n.configure({
      directory: path + '/locale',
      defaultLocale: 'en_US',
      autoReload: true,
      updateFiles: true,
      syncFiles: true,
      objectNotation: true
    })

    this.locale = i18n
  }

  registCommands (commands) {
    this.commands = commands
  }

  registExtensions (extensions) {
    this.extensions = extensions
  }

  registEvent (type, fnc) {
    this.on(type, (arg1, arg2, arg3, arg4, arg5, arg6) => {
      fnc(this, arg1, arg2, arg3, arg4, arg5, arg6)
    })
  }
}

module.exports = SeoaClient

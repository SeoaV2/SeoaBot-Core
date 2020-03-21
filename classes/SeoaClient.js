const { Client } = require('discord.js')
const { existsSync } = require('fs')
const path = require('path').resolve()

class SeoaClient extends Client {
  constructor () {
    super()

    let settings
    if(existsSync(path + '/settings.json')) settings = require(path + '/settings.json')
    this.token = process.env.token || settings.token
    this.prefix = process.env.SeoaPrefix || settings.prefix || 'b>'
    this.owner = settings.owner || []
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

  registCommands (commands) {
    this.commands = commands
  }

  registEvent (type, fnc) {
    this.on(type, (arg1, arg2, arg3, arg4, arg5, arg6) => {
      fnc(this, arg1, arg2, arg3, arg4, arg5, arg6)
    })
  }
}

module.exports = SeoaClient

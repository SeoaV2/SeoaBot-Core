const { Client } = require('discord.js')

class SeoaClient extends Client {
  constructor (token) {
    super()
    this.token = token
    this.prefix = process.env.SeoaPrefix || 'b>'
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

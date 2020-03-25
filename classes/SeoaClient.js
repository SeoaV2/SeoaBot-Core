const { Client } = require('discord.js')
const { existsSync } = require('fs')
const path = require('path').resolve()

class SeoaClient extends Client {
  constructor (ErrorHanlder) {
    super()

    let settings
    if (existsSync(path + '/settings.json')) settings = require(path + '/settings.json')
    else settings = { prefix: 'b>', owner: [] }
    this.token = process.env.SeoaToken || settings.token
    this.prefix = process.env.SeoaPrefix || settings.prefix
    this.owner = process.env.SeoaOwner || settings.owner
    this.webhookToken = process.env.SeoaWebhook || settings.webhook
    this.Error = ErrorHanlder

    this.DBconnection = settings.DBconnection

    this.readyAt = new Date()
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

  registExtensions (extensions) {
    this.extensions = extensions
  }

  registEvent (type, fnc) {
    this.on(type, (arg1, arg2, arg3, arg4, arg5, arg6) => {
      fnc(this, arg1, arg2, arg3, arg4, arg5, arg6)
    })
  }

  setupDatabase () {
    const knex = require('knex')({
      client: 'mysql',
      connection: this.DBconnection
    })

    this.knex = knex
  }
}

module.exports = SeoaClient

const { Client } = require('discord.js')
const { existsSync } = require('fs')
const path = require('path').resolve()
const knex = require('knex')

class SeoaClient extends Client {
  /**
   * Create Seoa client with error handler
   * @param {typeof import('./ErrorHandler')} ErrorHanlder Seoa ErrorHandler
   */
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

    this._path = ''
  }

  /**
   * Start Seoa client
   */
  start () {
    this.login(this.token)
  }

  /**
   * Restart Seoa client
   */
  restart () {
    this.destroy()
    setTimeout(() => {
      this.start()
    }, 3000)
  }

  /**
   * Regist Locale handler
   * @param {import('./LocaleHandler')} locale Seoa LocaleHandler
   */
  registLocale (locale) {
    this.locale = locale
  }

  /**
   * Regist Command handler
   * @param {import('./CommandHandler')} commands Seoa CommandHandler
   */
  registCommands (commands) {
    this.commands = commands
  }

  /**
   * Regist Extension handler
   * @param {import('./ExtensionHandler')} extensions Seoa ExtensionHandler
   */
  registExtensions (extensions) {
    this.extensions = extensions
  }

  /**
   * Regist Events
   * @param {String} type Event name
   * @param {Function} fnc When event occured this function will be call
   */
  registEvent (type, fnc) {
    this.on(type, (arg1, arg2, arg3, arg4, arg5, arg6) => {
      fnc(this, arg1, arg2, arg3, arg4, arg5, arg6)
    })
  }

  /**
   * Setup mysql database with knex
   */
  setupDatabase () {
    const db = knex({
      client: 'mysql',
      connection: this.DBconnection
    })

    this.db = db
  }
}

module.exports = SeoaClient

const path = require('path').resolve()
const { hostname } = require('os')
const { WebhookClient } = require('discord.js')

const djsPath = 'seoa://node_modules/discord.js/src'
const wsPath = 'seoa://node_modules/ws/lib'

class ErrorHandler extends Error {
  /**
   * Create new Seoa's Error
   * @param {import('./SeoaClient')} seoa discord.js Client
   * @param {String} msg Custom Error Message
   */
  constructor (seoa, msg) {
    super(msg)
    console.error(this.stack)
    this.stack = '```' + this.stack.split(path).join('seoa:/').split(djsPath).join('djs:/').split(wsPath).join('ws:/') + '```'
    this.title = 'Seoa v2 Beta Error Report: from ' + hostname

    if (!seoa.webhookToken) return
    this.webhook = new WebhookClient('691241324111724574', seoa.webhookToken)
  }

  /**
   * Report Error to Webhook
   */
  report () {
    if (!this.webhook) return
    this.webhook.send(this.stack, { username: this.title })
  }
}

module.exports = ErrorHandler

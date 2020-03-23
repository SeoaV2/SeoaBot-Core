const path = require('path').resolve()
const { hostname } = require('os')
const { WebhookClient } = require('discord.js')

const djsPath = 'seoa://node_modules/discord.js/src'
const wsPath = 'seoa://node_modules/ws/lib'

class ErrorHandler extends Error {
  constructor (seoa, msg) {
    super(msg)
    console.error(this.stack)
    this.stack = '```' + this.stack.split(path).join('seoa:/').split(djsPath).join('djs:/').split(wsPath).join('ws:/') + '```'
    this.title = 'Seoa v2 Beta Error Report: from ' + hostname

    if (!seoa.webhookToken) return
    this.webhook = new WebhookClient('691241324111724574', seoa.webhookToken)
  }

  report () {
    if (!this.webhook) return
    this.webhook.send(this.stack, { username: this.title })
  }
}

module.exports = ErrorHandler

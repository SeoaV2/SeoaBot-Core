const os = require('os')
const path = require('path').resolve()
const { WebhookClient } = require('discord.js')

class ErrorHandler extends Error {
  constructor (seoa, msg) {
    super(msg)
    this.stack = '```' + this.stack.split(path).join('') + '```'
    this.title = 'Seoa v2 Beta Error Report: from ' + os.hostname

    if (!seoa.webhookToken) return
    this.webhook = new WebhookClient('691241324111724574', seoa.webhookToken)
  }

  report () {
    if (!this.webhook) return
    this.webhook.send(this.stack, { username: this.title })
  }
}

module.exports = ErrorHandler

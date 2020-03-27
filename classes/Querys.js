class Querys {
  /**
   * Querying message content
   * @param {import('./SeoaClient')} seoa discord.js Client
   * @param {import('discord.js').Message} msg discord.js Message
   */
  constructor (seoa, msg) {
    this.content = msg.content.split(seoa.prefix)[1]
    if (!this.content) return

    this.splits = this.content.split(' ')
    this.cmd = this.splits[0]
    if (!this.cmd) this.cmd = 'intro'
    this.args = this.splits.slice(1)
  }
}

module.exports = Querys

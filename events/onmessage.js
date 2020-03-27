const Querys = require('../classes/Querys')

/**
 * On every messages
 * @param {import('../classes/SeoaClient')} seoa Seoa Client
 * @param {import('discord.js').Message} msg discord.js Message
 */
function onMessage (seoa, msg) {
  if (msg.author.bot || !msg.content) return
  if (!msg.content.startsWith(seoa.prefix)) return

  const query = new Querys(seoa, msg)
  const target = seoa.commands.get(query.cmd)
  if (target) seoa.commands.run(target, seoa, msg, query)
}

module.exports = onMessage

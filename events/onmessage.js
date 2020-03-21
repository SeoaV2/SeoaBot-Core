const Querys = require('../classes/Querys')

function onMessage (seoa, msg) {
  if (msg.author.bot || !msg.content) return

  const query = new Querys(seoa, msg)
  const target = seoa.commands.get(query.cmd)
  if (target) target(seoa, msg, query)
}

module.exports = onMessage

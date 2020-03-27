/**
 * On clinet is ready
 * @param {import('../classes/SeoaClient')} seoa discord.js Client
 */
function onReady (seoa) {
  console.log('Logged in as ' + seoa.user.tag)
  seoa.user.setActivity(`Test / ${seoa.prefix}help`)
  const cycles = seoa.extensions.get('Cycles')
  if (cycles) cycles.active()
}

module.exports = onReady

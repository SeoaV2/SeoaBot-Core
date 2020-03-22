function onReady (seoa) {
  console.log('Logged in as ' + seoa.user.tag)
  seoa.user.setActivity(`Test / ${seoa.prefix}help`)
}

module.exports = onReady

const path = require('path').resolve()

const Commands = require('./classes/Commands')
const SeoaClient = require('./classes/SeoaClient')

const onReadyEvent = require('./events/onready')
const onMessageEvent = require('./events/onmessage')

const seoa = new SeoaClient()
const commands = new Commands(path + '/commands/')

seoa.start()
seoa.registCommands(commands)
seoa.registEvent('ready', onReadyEvent)
seoa.registEvent('message', onMessageEvent)

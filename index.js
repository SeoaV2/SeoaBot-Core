const path = require('path').resolve()

const CommandHandler = require('./classes/CommandHandler')
const SeoaClient = require('./classes/SeoaClient')

const onReadyEvent = require('./events/onready')
const onMessageEvent = require('./events/onmessage')

const seoa = new SeoaClient()
const commands = new CommandHandler(path + '/commands/')

seoa.start()
seoa.registCommands(commands)
seoa.registEvent('ready', onReadyEvent)
seoa.registEvent('message', onMessageEvent)

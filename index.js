const path = require('path').resolve()

const SeoaClient = require('./classes/SeoaClient')
const CommandHandler = require('./classes/CommandHandler')
const ExtensionHandler = require('./classes/ExtensionHandler')

const onReadyEvent = require('./events/onready')
const onMessageEvent = require('./events/onmessage')

const seoa = new SeoaClient()
const commands = new CommandHandler(path + '/commands/')
const extensions = new ExtensionHandler(path + '/extensions/')

seoa.start()
seoa.registExtensions(extensions)
seoa.registCommands(commands)
seoa.registEvent('ready', onReadyEvent)
seoa.registEvent('message', onMessageEvent)

const path = require('path').resolve()

const SeoaClient = require('./classes/SeoaClient')
const ErrorHandler = require('./classes/ErrorHandler')
const LocaleHandler = require('./classes/LocaleHandler')
const CommandHandler = require('./classes/CommandHandler')
const ExtensionHandler = require('./classes/ExtensionHandler')

const onReadyEvent = require('./events/onready')
const onMessageEvent = require('./events/onmessage')

const seoa = new SeoaClient(ErrorHandler)
seoa.start()
seoa.setupDatabase()

const locale = new LocaleHandler(seoa)
seoa.registLocale(locale)

const extensions = new ExtensionHandler(seoa, path + '/extensions/')
seoa.registExtensions(extensions)

const commands = new CommandHandler(seoa, path + '/commands/')
seoa.registCommands(commands)

seoa.registEvent('ready', onReadyEvent)
seoa.registEvent('message', onMessageEvent)

const { existsSync, readdir } = require('fs')

class CommandHandler {
  constructor (seoa, path) {
    this.client = seoa
    seoa._path = path
    this._commands = new Map()
    if (!existsSync(path)) return

    readdir(path, (err, commandFiles) => {
      if (err) console.log(err)
      else {
        commandFiles.forEach((CommandFile) => {
          if (!CommandFile.endsWith('.js')) return

          // CommandFile = CommandFile.replace('.js', '')
          CommandFile = require(path + CommandFile)
          const c = this.register(CommandFile)
          console.log('Command Loaded: ' + c.name)
        })
      }
    })
  }

  register (CommandFile) {
    const c = new CommandFile()
    this._commands.set(c.name, c)
    if (c.aliases.length > 0) c.aliases.forEach((alias) => { this._commands.set(alias, c) })

    return c
  }

  reregister (NewCmd, oldCmd) {
    // remove all aliases
    oldCmd.aliases.forEach((alias) => { if (this._commands.has(alias)) this._commands.delete(alias) })
    // remove command name itself
    this._commands.delete(oldCmd.name)

    // register again
    const c = new NewCmd()
    this._commands.set(c.name, c)
    if (c.aliases.length > 0) c.aliases.forEach((alias) => { this._commands.set(alias, c) })
  }

  unregister (cmd) {
    // remove all aliases
    // eslint-disable-next-line no-undef
    oldCmd.aliases.forEach((alias) => { if (this._commands.has(alias)) this._commands.delete(alias) })
    // remove command name itself
    // eslint-disable-next-line no-undef
    this._commands.delete(oldCmd.name)
  }

  get (name) {
    return this._commands.get(name)
  }

  run (command, seoa, msg, args) {
    // Perms Check Logic here
    if (command.ownerOnly && !seoa.owner.includes(msg.author.id)) return msg.reply('Only the owners of this bot can run this command.')

    // Run
    try {
      command.run(seoa, msg, args)
    } catch (err) {
      const error = new seoa.Error(seoa, err.message)
      error.report()

      msg.reply(
        'An error occured while running the command.\n' +
        'Please report this error message to the support server.\n' +
        '(Use `' + seoa.prefix + 'invite` to get the server link)\n' +
        '\nError message: `' + error.message + '`'
      )
    }
  }
}

module.exports = CommandHandler

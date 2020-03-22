const { existsSync, readdir } = require('fs')

class CommandHandler {
  constructor (path) {
    this._commands = new Map()
    if (!existsSync(path)) return

    readdir(path, (err, commandFiles) => {
      if (err) console.log(err)
      else {
        commandFiles.forEach((CommandFile) => {
          if (!CommandFile.endsWith('.js')) return

          // CommandFile = CommandFile.replace('.js', '')
          CommandFile = require(path + CommandFile)
          const c = new CommandFile()
          this._commands.set(c.name, c)
          console.log('Command Loaded: ' + c.name)
          if (c.aliases.length > 0) c.aliases.forEach((alias) => { this._commands.set(alias, c) })
        })
      }
    })
  }

  get (name) {
    return this._commands.get(name)
  }

  run (command, seoa, msg, args) {
    // Perms Check Logic here

    // Run
    try {
      command.run(seoa, msg, args)
    } catch (err) {
      msg.reply(`An error occured while running the command.\nPlease report this error message to the support server.\n(Use \`${seoa.prefix}invite\` to get the server link)\n\nError message: \`${err.message}\``)
    }
  }
}

module.exports = CommandHandler

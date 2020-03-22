const { readdir } = require('fs')

class CommandHandler {
  constructor (path) {
    this._commands = new Map()

    readdir(path, (err, files) => {
      if (err) console.log(err)
      else {
        files.forEach((f) => {
          if (!f.endsWith('.js')) return

          //f = f.replace('.js', '')
          f = require(path + f)
          let c = new f()
          this._commands.set(c.name, c)
          if (c.aliases.length > 0) c.aliases.forEach((alias) => {this._commands.set(alias, c)})
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
    command.run(seoa, msg, args)
  }
}

module.exports = CommandHandler

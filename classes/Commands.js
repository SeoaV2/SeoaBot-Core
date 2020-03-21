const { readdir } = require('fs')

class Commands {
  constructor (path) {
    this._commands = []

    readdir(path, (err, files) => {
      if (err) console.log(err)
      else {
        files.forEach((f) => {
          if (!f.endsWith('.js')) return

          f = f.replace('.js', '')
          f = require(path + f)
          if (f.alias) this._commands.push(f)
        })
      }
    })
  }

  get (name) {
    return this._commands.find((e) => e.alias.includes(name))
  }
}

module.exports = Commands

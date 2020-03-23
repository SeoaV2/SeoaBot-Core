const path = require('path')

class Command {
  constructor () {
    this.name = ''
    this.description = ''
    this.aliases = []
    this.clientPerms = []
    this.userPerms = []
    this.ownerOnly = false
  }

  run () {
    throw new Error('run() function not provided')
  }

  reload (seoa) {
    const cmdPath = path.join(seoa._path, this._group, this.name + '.js')
    // const oldCmd = require.cache[cmdPath]
    delete require.cache[cmdPath]
    const newCmd = require(cmdPath)

    seoa.commands.reregister(newCmd, this)
  }

  unload (seoa) {
    const cmdPath = path.join(seoa._path, this._group, this.name + '.js')
    delete require.cache[cmdPath]
    seoa.commands.unregister(this)
  }
}

module.exports = Command

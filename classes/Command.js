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
}

module.exports = Command

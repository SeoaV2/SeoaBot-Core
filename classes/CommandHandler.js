const { existsSync, readdir, lstatSync } = require('fs')

class CommandHandler {
  /**
   * Start Command Handling
   * @param {import('./SeoaClient')} seoa discord.js Client
   * @param {String} path Path to Seoa's Command Files
   */
  constructor (seoa, path) {
    this.client = seoa
    seoa._path = path
    this._aliases = new Map()
    this._commands = new Map()
    if (!existsSync(path)) return

    readdir(path, (err, nameSpaces) => {
      if (err) console.log(err)
      else {
        nameSpaces.forEach((nameSpace) => {
          if (!lstatSync(path + nameSpace).isDirectory()) return
          readdir(path + nameSpace, (err, commandFiles) => {
            if (err) console.log(err)
            else {
              commandFiles.forEach((commandFile) => {
                if (!commandFile.endsWith('.js')) return

                const command = require(path + nameSpace + '/' + commandFile)
                const c = this.register(command, nameSpace)
                console.log('Command Loaded: ' + c.name)
              })
            }
          })
        })
      }
    })
  }

  /**
   * Regist Command File
   * @param {typeof import('./Command')} CommandFile Loaded Command File
   * @param {String} group Commad Group
   * @returns {import('./Command')} Modified Command File
   */
  register (CommandFile, group) {
    const c = new CommandFile()

    // Conflict check
    if (this._commands.has(c.name)) {
      throw new Error('A Command "' + c.name + '" already exists.')
    }

    for (const alias of this._aliases) {
      if (c.aliases.includes(alias)) {
        throw new Error('A Command with the alias "' + alias + '" already exists.')
      }
    }

    c._group = group

    this._commands.set(c.name, c)
    this._aliases.set(c.name, c.name)
    if (c.aliases.length > 0) c.aliases.forEach((alias) => { this._aliases.set(alias, c.name) })

    return c
  }

  /**
   * Replace oldCmd to newCmd
   * @param {typeof import('./Command')} newCmd Not Loaded Command File
   * @param {import('./Command')} oldCmd Aleady Loaded Command File
   */
  reregister (newCmd, oldCmd) {
    this.unregister(oldCmd)
    this.register(newCmd, oldCmd._group)
  }

  /**
   * Unregist Command File
   * @param {import('./Command')} cmd Loaded Command File
   */
  unregister (cmd) {
    // remove all aliases
    cmd.aliases.forEach((alias) => { if (this._aliases.has(alias)) this._aliases.delete(alias) })
    this._commands.delete(cmd.name)

    // remove command name itself
    this._commands.delete(cmd.name)
  }

  /**
   * Search Command File with name
   * @param {String} name search name
   */
  get (name) {
    const cmd = this._aliases.get(name)
    return this._commands.get(cmd)
  }

  /**
   * Run Specific Command
   * @param {import('./Command')} command Command Module File to run
   * @param {import('./SeoaClient')} seoa discord.js Client
   * @param {import('discord.js').Message} msg discord.js Message
   * @param {import('./Querys')} query Message Arguments
   */
  async run (command, seoa, msg, query) {
    // Perms Check Logic here
    if (command.ownerOnly && !seoa.owner.includes(msg.author.id)) return msg.reply('Only the owners of this bot can run this command.')

    // Run
    try {
      const locale = await msg.guild ? seoa.locale.getGuildLocale(msg.guild.id) : 'en_US'
      command.run(seoa, msg, query, locale)
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

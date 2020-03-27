const { existsSync, readdir, lstatSync } = require('fs')

class ExtensionHandler {
  /**
   * Start Extension Handling
   * @param {import('./SeoaClient')} seoa discord.js Client
   * @param {String} path Path to Seoa's Extensions
   */
  constructor (seoa, path) {
    this._extensions = {}
    if (!existsSync(path)) return this

    readdir(path, (err, exFolder) => {
      if (err) console.log(err)
      else {
        exFolder.forEach((ex) => {
          if (!lstatSync(path + ex).isDirectory()) return
          if (!existsSync(path + ex + '/index.js')) return
          console.log('Extension Loaded: ' + ex)
          const Ex = require(path + ex + '/index.js')
          this._extensions[ex] = new Ex(seoa)
        })
      }
    })
  }

  /**
   * Search Command File with name
   * @param {String} name search name
   */
  get (name) {
    return this._extensions[name]
  }
}

module.exports = ExtensionHandler

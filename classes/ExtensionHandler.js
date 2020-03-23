const { existsSync, readdir, lstatSync } = require('fs')

class Extensions {
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

  get (name) {
    return this._extensions[name]
  }
}

module.exports = Extensions

const { existsSync, readdir, lstatSync } = require('fs')

class Extensions {
  constructor (seoa, path) {
    this._extensions = {}
    if (!existsSync(path)) return this

    readdir(path, (err, exFolder) => {
      if (err) console.log(err)
      else {
        exFolder.forEach((Ex) => {
        if (!lstatSync(path + Ex).isDirectory()) return
          if (!existsSync(path + Ex + '/index.js')) return
          console.log('Extension Loaded: ' + Ex)
          Ex = require(path + Ex + '/index.js')
          this._extensions[Ex] = new Ex(seoa)
        })
      }
    })
  }

  get (name) {
    return this._extensions[name]
  }
}

module.exports = Extensions

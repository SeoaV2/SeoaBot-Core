const { existsSync, readdir, lstatSync } = require('fs')

class Extensions {
  constructor (path) {
    this._extensions = {}
    if (!existsSync(path)) return this

    readdir(path, (err, exFolder) => {
      if (err) console.log(err)
      else {
        if (!lstatSync(path + exFolder).isDirectory) return
        exFolder.forEach((ex) => {
          if (!existsSync(path + ex + '/index.js')) return
          console.log('Extension Loaded: ' + ex)
          this._extensions[ex] = require(path + ex + '/index.js')
        })
      }
    })
  }

  get (name) {
    return this._extensions[name]
  }
}

module.exports = Extensions

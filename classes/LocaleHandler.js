const i18n = require('i18n')
const path = require('path').resolve()

class LocaleHandler {
  constructor (seoa) {
    i18n.configure({
      directory: path + '/locale',
      defaultLocale: 'en_US',
      autoReload: true,
      updateFiles: true,
      syncFiles: true,
      objectNotation: true
    })

    this.seoa = seoa
    this.i18n = i18n
    this.t = (phrase, locale, ...args) => { return i18n.__({ phrase, locale }, ...args) }
  }

  async getGuildLocale (id) {
    let dbData
    try {
      dbData = await this.seoa.knex('guild').select('locale').where('id', id)
    } catch (err) { console.error(err.stack); return 'en_US' }
    if (dbData.length < 1) return 'en_US'
    else return dbData[0].locale
  }
}

module.exports = LocaleHandler

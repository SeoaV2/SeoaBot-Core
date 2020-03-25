const i18n = require('i18n')
const path = require('path').resolve()

class LocaleHandler {
  constructor(seoa) {
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
    this.t = async (phrase, guildID, ...args) => {return i18n.__({phrase, locale: await this.getGuildLocale(guildID)}, ...args)}
  }

  async getGuildLocale (id) {
    const dbData = await this.seoa.knex('guild').select('locale').where('id', id)
    if(dbData.length < 1) return 'en_US'
    else return dbData[0].locale
  }
}

module.exports = LocaleHandler

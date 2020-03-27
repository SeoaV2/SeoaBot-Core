const i18n = require('i18n')
const path = require('path').resolve()

class LocaleHandler {
  /**
   * Start Locale Handling
   * @param {import('./SeoaClient')} seoa discord.js Client
   */
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

    /**
     * Phrase String with i18n
     * @param {String} phrase String to phrase
     * @param {String} locale Locale_Code to phrase
     * @param {String[]} args Arguments to phrase
     */
    this.t = (phrase, locale, ...args) => { return i18n.__({ phrase, locale }, ...args) }
  }

  /**
   * Search Guild's Locale_Code
   * @param {String} id SnowFlank Guild ID
   */
  async getGuildLocale (id) {
    let dbData
    try {
      dbData = await this.seoa.db('guild').select('locale').where('id', id)
    } catch (err) { console.error(err.stack); return 'en_US' }
    if (dbData.length < 1) return 'en_US'
    else return dbData[0].locale
  }
}

module.exports = LocaleHandler

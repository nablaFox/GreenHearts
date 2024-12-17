module.exports = {
  locales: ['en'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'i18n/locales/{locale}/messages',
      include: ['app', 'components']
    }
  ],
  format: 'po'
}


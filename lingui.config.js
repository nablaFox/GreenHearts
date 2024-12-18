module.exports = {
  locales: ['en', 'it'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: 'i18n/locales/{locale}/messages',
      include: ['app', 'components', 'hooks']
    }
  ],
  format: 'po'
}

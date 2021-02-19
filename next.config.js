const { nextI18NextRewrites } = require('next-i18next/rewrites')
const localeSubpaths = {
  uz: 'uz',
  en: 'en',
}
module.exports = {
  env: {
    SECRET_KEY: '',
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
}

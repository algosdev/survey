const { nextI18NextRewrites } = require('next-i18next/rewrites')
const localeSubpaths = {
  uz: 'uz',
  en: 'en',
}
// https://survey.api.udevs.io/swagger/index.html
const baseUrl = 'https://survey.api.udevs.io/v1'
module.exports = {
  env: {
    GENERATE_OTP_API_URL: `${baseUrl}/auth/otp/generate/customer`,
    REGISTER_API_URL: `${baseUrl}/auth/register/customer`,
    UPDATE_CUSTOMER_API_URL: `${baseUrl}/update-customer-self`,
    LOGIN_API_URL: `${baseUrl}/auth/otp/confirm/customer`,
    GET_USER_BY_ID_API_URL: `${baseUrl}/customer/`,
    UUID: '0506aacd-8eaa-42bf-b3d0-9b45298a66ce',
  },
  publicRuntimeConfig: {
    localeSubpaths,
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
}

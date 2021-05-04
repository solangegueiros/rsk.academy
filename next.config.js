/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */

const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  webpack: {
    node: {
      fs: 'empty',
      child_process: 'empty',
      http2: 'empty',
      net: 'empty',
    },
  },
}

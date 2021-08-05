/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */

const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  webpack: config => {
    config.resolve.alias.stream = 'stream-browserify'
    config.resolve.alias.zlib = 'browserify-zlib'

    config.resolve.fallback = {
      fs: false,
      child_process: false,
      http2: false,
      http: false,
      https: false,
      os: false,
      net: false,
      crypto: false,
      stream: false,
      zlib: false,
      constants: false,
    }

    return config
  },
}

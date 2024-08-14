/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
])

module.exports = withTM({
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },

  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // Configure o Webpack para adicionar hashes aos nomes dos arquivos
      config.output.filename = 'static/chunks/[name].[contenthash].js';
      config.output.chunkFilename = 'static/chunks/[name].[contenthash].js';
    }
    return config;
  },
})

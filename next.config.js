/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

// Importe as configurações de withPWA e withTM
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  runtimeCaching: [], // Desativa o cache do navegador
  buildExcludes: [/middleware-manifest.json$/],
})

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/react',
  '@fullcalendar/daygrid',
  '@fullcalendar/list',
  '@fullcalendar/timegrid',
])

module.exports = withPWA(
  withTM({
    trailingSlash: true,
    reactStrictMode: false,
    experimental: {
      esmExternals: false
    },
    webpack(config) {
      // Sua configuração de alias e outras customizações webpack aqui
      config.resolve.alias = {
        ...config.resolve.alias,
        apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
      }

      // Aqui você pode adicionar outras personalizações webpack, se necessário

      return config
    },

  }),
)

const CracoAlias = require('craco-alias')

module.exports = {
  babel: {
    plugins: [],
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          src: './src',
        },
      },
    },
  ],
}

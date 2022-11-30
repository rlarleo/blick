const cracoAlias = require('craco-alias');

module.exports = {
  resolve: {
    fallback: {
      crypto: false,
    },
  },
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: 'tsconfig.extend.json',
        debug: false,
      },
    },
  ],
};

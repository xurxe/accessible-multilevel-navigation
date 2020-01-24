const addCommonConfig = require('../webpack.common.config');

module.exports = async ({ config }) => {
  // Add configuration that is shared between the main build & storybook.
  config = addCommonConfig(config);

  // StorySource addon. Loads sources for stories and shows them in Storybook.
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre',
  });

  return config;
};

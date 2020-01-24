// Common configuration for main build & storybook.

const { statSync, readdirSync } = require('fs');
const path = require('path');

const isDirectory = source => statSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source)
    .map(name => ({ name, path: path.resolve(__dirname, source, name) }))
    .filter(d => isDirectory(d.path));

module.exports = config => {
  const rules = config.module.rules;

  // modify storybook's file-loader rule to avoid conflicts with your inline svg
  const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
  fileLoaderRule.exclude = /assets\/.*\.svg$/;

  rules.push({
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true, // true outputs JSX tags
        },
      },
    ],
  });

  // Custom aliases for important directories.
  config.resolve.alias['projectRoot'] = path.resolve(__dirname);
  config.resolve.alias['components'] = path.resolve(__dirname, 'components');
  config.resolve.alias['assets'] = path.resolve(__dirname, 'assets');

  // Add all dirs under components as separate aliases.
  const dirs = [...getDirectories(path.join(__dirname, 'components'))];
  dirs.forEach(dir => {
    // Make sure _Dir is still importable from just "Dir".
    const dirname =
      dir.name.substr(0, 1) === '_' ? dir.name.substr(1) : dir.name;
    config.resolve.alias[dirname] = dir.path;
  });

  // Enable __filename for storybook.
  config.node = Object.assign({}, config.node, {
    __filename: true,
  });

  config.module.rules.push();

  return config;
};

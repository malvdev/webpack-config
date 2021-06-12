const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./paths.js');

const configureBabelLoader = () => {
  return {
    test: /\.(ts|js)x?$/,
    exclude: [/(node_modules|bower_components)/],
    use: ['babel-loader'],
  };
};

const configureImagesLoader = () => {
  return { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' };
};

const configureFontsAndSvgLoader = () => {
  return { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' };
};

const cleanWebpackPlugin = () => {
  return new CleanWebpackPlugin();
};

const eslintPlugin = () => {
  return new ESLintPlugin({
    files: ['.', 'src', 'config'],
    formatter: 'table',
  });
};

const htmlWebpackPlugin = () => {
  return new HtmlWebpackPlugin({
    title: 'Webpack Config',
    favicon: paths.src + '/images/favicon.png',
    template: paths.src + '/index.html'
  });
};

module.exports = {
  entry: [paths.src + '/index.ts'],
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      configureBabelLoader(),
      configureImagesLoader(),
      configureFontsAndSvgLoader(),
    ],
  },
  plugins: [cleanWebpackPlugin(), htmlWebpackPlugin(), eslintPlugin()],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};

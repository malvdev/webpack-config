const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const paths = require('./paths.js');

const configureDevServer = () => {
  return {
    historyApiFallback: true,
    contentBase: paths.build,
    compress: true,
    hot: true,
    port: 8080,
  };
};

const configurePostcssLoader = () => {
  return {
    test: /\.s[ac]ss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: { sourceMap: true, importLoaders: 1 },
      },
      { loader: 'postcss-loader', options: { sourceMap: true } },
      { loader: 'sass-loader', options: { sourceMap: true } },
    ],
  };
};

const hotModuleReplacementPlugin = () => {
  return new webpack.HotModuleReplacementPlugin();
};

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: configureDevServer(),
  module: {
    rules: [configurePostcssLoader()],
  },
  plugins: [hotModuleReplacementPlugin()],
});

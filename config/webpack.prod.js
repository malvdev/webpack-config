const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const paths = require('./paths.js');

const cleanWebpackPlugin = () => {
  return new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: '**/*',
    verbose: true,
    dry: false,
  });
};

const configureOptimization = () => {
  return {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
    runtimeChunk: {
      name: 'runtime',
    },
  };
};

const miniCssExtractPlugin = () => {
  return new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash].css',
    chunkFilename: '[id].css',
  });
};

const configurePostcssLoader = () => {
  return {
    test: /\.s[ac]ss|css$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
        },
      },
      'postcss-loader',
      'sass-loader',
    ],
  };
};

module.exports = [
  merge(common, {
    mode: 'production',
    devtool: false,
    output: {
      path: paths.build,
      publicPath: '/',
      filename: 'js/[name].[contenthash].bundle.js',
    },
    module: {
      rules: [configurePostcssLoader()],
    },
    plugins: [cleanWebpackPlugin(), miniCssExtractPlugin()],
    optimization: configureOptimization(),
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  }),
];

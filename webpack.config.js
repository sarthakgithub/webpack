const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const getPlugins = env =>
  [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, './dist/static/index.html'),
      inject: true,
      chunks: ['app', 'vendors']
    }),
    env.analyze && new BundleAnalyzerPlugin()
  ].filter(plugin => plugin);

module.exports = env => {
  const config = {
    mode: env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
      app: [path.resolve(__dirname, './src/index.js')],
      vendors: ['react', 'react-dom']
    },
    output: {
      path: path.join(__dirname, './dist/static'),
      filename: '[name]_[chunkhash].js',
      publicPath: '/'
    },
    // module: {
    //   rules: []
    // },
    resolve: {
      modules: [
        path.resolve(__dirname, './src'),
        // path.resolve(__dirname, './dist/static'),
        path.resolve(__dirname, './node_modules')
      ],
      extensions: ['.js', '.jsx', 'json']
    },
    plugins: getPlugins(env),
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: false
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: true
            },
            output: {
              ecma: 5,
              comments: false
            }
          },
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: true
        })
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, '/dist/static/'),
      compress: true,
      port: 9000
    }
    // devTools: ''
  };
  return config;
};

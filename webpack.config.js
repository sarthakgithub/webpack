const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    plugins: [
      new HtmlWebpackPlugin({
         filename: path.join(__dirname, "./dist/static/index.html"),
         inject: true,
         chunks: ["app", "vendors"],
      })
    ],
    optimization: {
      splitChunks: {},
      minimizer: []
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

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    // 'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    // 'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.jsx'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',

    path: resolve(__dirname, 'public'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    // hot: true,
    // enable HMR on the server
    historyApiFallback: true,

    contentBase: resolve(__dirname, 'public'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules',
          'sass-loader',
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'API_BASE': JSON.stringify('http://ec2-54-167-181-205.compute-1.amazonaws.com:8080/ticket-guru/v1/api')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};

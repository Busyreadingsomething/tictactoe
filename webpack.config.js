const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.jsx'),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        rules: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query : {
          presets: ['env', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['js', '.jsx', 'json'],
  }
};

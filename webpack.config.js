const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['./src/client/index.jsx'],
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: './public',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: [/node_modules/, /server/],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /server/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
};

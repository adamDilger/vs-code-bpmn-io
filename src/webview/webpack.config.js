const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/webview/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '..', '..', 'out', 'assets'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
}
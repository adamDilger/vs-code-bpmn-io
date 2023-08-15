const { WebpackDeduplicationPlugin } = require('webpack-deduplication-plugin');
const path = require('path');

module.exports = {
  entry: './webview-main.js',
  output: {
    filename: 'webview.bundle.js',
    path: path.resolve(__dirname, 'out'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: 'asset/inline',
      },
    ],
  },
  plugins: [new WebpackDeduplicationPlugin({})],
};

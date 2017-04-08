var webpack = require('webpack'),
    path = require('path');

var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, "frontend", "app"),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["react-es2015","es2015"],
            plugins: ["transform-object-rest-spread", "transform-decorators-legacy"]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'frontend'),
    filename: PROD ? 'bundle.min.js' : 'bundle.js'
  },
  plugins: PROD ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};

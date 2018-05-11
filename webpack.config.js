var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  // webpack folder’s entry js — excluded from jekll’s build process.
  entry: {
    'markov': './src/markov.js'
  },
  output: {
    // we’re going to put the generated file in the assets folder so jekyll will grab it.
    path: path.resolve(__dirname, 'assets/javascripts/'),
    filename: '[name].js',
    library: '[name]'
  },
  module: {
  loaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: false
    }),
    new CopyWebpackPlugin([
      {
        from: './node_modules/cytoscape/dist/cytoscape.min.js',
        to: 'dist/cytoscape.js'
      },
    ])
  ]
};

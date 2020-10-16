const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const babelOptions = preset => {
  const options = {
    presets: [
      '@babel/preset-env'
    ]
  }

  if (preset) {
    options.presets.push(preset)
  }

  return options;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.jsx'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'docs')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, `docs`),
    port: 4200,
    hot: isDev,
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'docs')},
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      },
    ]
  }
}

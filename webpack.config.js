const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { stat } = require('fs');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Adjust this path as necessary
        })
    ],
  devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
  }
};

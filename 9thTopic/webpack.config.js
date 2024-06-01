const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/app.js',
    output: {
      filename: 'main.[contenthash].js',
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        title: 'Форма оплаты'
      }),
      new MiniCssExtractPlugin({
        filename: 'main.[contenthash].css'
      }),
      isProduction && new ImageMinimizerPlugin({
        minimizerOptions: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
    ].filter(Boolean),
    devServer: {
      hot: true,
      historyApiFallback: true
    }
  };
};

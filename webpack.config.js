const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const config = require('./public/config')[isDev ? 'dev' : 'build']
const path = require('path')
const {CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: 'cheap-module-eval-source-map', // 定位代码位置
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'bundle.[hash].js',
    publicPath:'/', //通常是CDN地址
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  'core.js': 3
                }
              ]
            ]
          }
        },
        exclude: /node_modules/
      },
      // loader 的执行顺序是从右向左执行, 注意顺序
      {
        test: /\.(le|c)ss$/,
        use: [
          'style-loader',
          'css-loader',

          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer')({
                    overrideBrowserslist: ['>0.25%', 'not dead']
                  })
                ]
              }
            }
          },
          'less-loader'
        ],
        exclude: /node_module/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              name: '[name]_[hash:6].[ext]',
              outputPath: 'assets', // npm run build时图片产生路径
            }
          }
        ],
        exclude: /node_module/
      }
    ]
  },
  devServer: {
    port: '8888',
    quiet: false,
    inline: true,
    stats: 'errors-only',
    overlay: false,
    clientLogLevel: 'silent',
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      config: config.template,
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false
      }
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'], //不删除dll目录下的文件
    }),
  ]
}

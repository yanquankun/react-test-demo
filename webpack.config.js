//webpack.config.js
var webpack = require("webpack");
var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
module.exports = {
  // target：告知 webpack 为目标(target)指定一个环境。默认值为 "browserslist"，如果没有找到 browserslist 的配置，则默认为 "web"
  // webpack5的bug，不加热更新失效
  target: "web",
  entry: ["react-hot-loader/patch", path.join(__dirname, "/src/index.jsx")],
  mode: process.env.NODE_ENV || "development",
  devServer: {
    port: 3100,
    inline: true,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
  },
  watch: true,
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      inject: "body",
      scriptLoading: "blocking",
    }),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: "public", // 主要解决react html模板中%PUBLIC_URL%的解析错误
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        use: ["file-loader"],
      },
    ],
  },
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
};

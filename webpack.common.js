const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "docs"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env"]],
              },
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.(png|svg|jpg|jpeg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(ttf|otf|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),

    // Index
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),

    // Section
    new HtmlWebpackPlugin({
      template: "./src/articles.html",
      filename: "./articles.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/gallery.html",
      filename: "./gallery.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/responsive-images.html",
      filename: "./responsive-images.html",
    }),

    // Article
    new HtmlWebpackPlugin({
      template: "./src/articles/glamping.html",
      filename: "./articles/glamping.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/articles/advice.html",
      filename: "./articles/advice.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/gallery/house.html",
      filename: "./gallery/house.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/gallery/garden.html",
      filename: "./gallery/garden.html",
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, "./src/partials/analytics.html"),
        location: "analytics",
        template_filename: "*",
        priority: "replace",
      },
    ]),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

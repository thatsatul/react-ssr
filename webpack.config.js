const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootDir = __dirname;

const commonConfig = env => ({
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: env.NODE_ENV || JSON.stringify("development"),
        SERVER_PORT: env.SERVER_PORT
      },
    }),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        compress: false,
        // ecma: 6,
        mangle: true
      },
      sourceMap: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js|.jsx|.cjs$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss|\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    // poll: 1000,
    ignored: ['**/files/**/*.js', '**/node_modules'],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  }
});

const clientConfig = (env) => {
  const commonCg = commonConfig(env);
  return {
    ...commonCg,
    entry: './src/fe/index.jsx',
    output: {
      path: path.resolve(rootDir, './dist'),
      filename: 'client_bundle.js',
    },
    plugins: [
      // new HtmlWebpackPlugin({
      //   template: "./src/fe/index.html",
      //   fileName: "./index.html"
      // })
    ]
  }
};

const serverConfig = env => {
  const commonCg = commonConfig(env);
  return {
    ...commonCg,
    entry: './server.js',
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(rootDir, 'dist'),
      filename: 'server_bundle.js',
      publicPath: '/',
    },
  };
}

module.exports = env => [clientConfig(env), serverConfig(env)];

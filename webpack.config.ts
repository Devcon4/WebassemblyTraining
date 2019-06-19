import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpack from 'copy-webpack-plugin';
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
import { CheckerPlugin } from 'awesome-typescript-loader';

const abs = (literals: TemplateStringsArray, ...placeholders: string[]) => path.resolve(__dirname, literals.reduce((prev, curr, i) => prev += (placeholders || [])[--i] + curr));

const config: webpack.Configuration = {

  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.wasm', '.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  target: "node",
  node: {
    path: 'empty'
  },
  entry: abs`src/main.ts`,
  output: {
    path: abs`dist`
  },
  // Source maps support ('inline-source-map' also works)
  devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.wasm$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'application/wasm',
            },
          },
        ],
      },
    ]
  },
  plugins: [
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        title: 'Wasm Example',
        template: 'src/index.html'
      }),
      new CopyWebpack([
        {
          from: './src/cpp/a.out.wasm',
          to: 'dist/'
        }
      ])
  ]
};

export default config;
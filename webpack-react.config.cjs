const path = require("path");

// filename is webpack-react to avoid clashing with nuxt webpack config

module.exports = {
  entry: path.resolve(__dirname, "src-react", "renderer.js"),
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "bundle-renderer.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // webpack 4 keeps failing to bundle fhirpath code that uses optional chaining, so use babel to transpile
        include: /fhirpath/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  { targets: [">0.2%"] },
                ],
                "@babel/preset-react",
              ],
              plugins: [
                "@babel/plugin-proposal-optional-chaining",
              ],
            },
          },
        ],
      },
    ],
  },
};

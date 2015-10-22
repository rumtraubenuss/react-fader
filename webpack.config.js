var path = require("path");

module.exports = {

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  },

  entry: {
    app: ["./src/react-fader.jsx"]
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "react-fader.js",
    library: 'Fader',
    libraryTarget: "umd"
  },

  externals: {
    'react': 'React'
  }

};

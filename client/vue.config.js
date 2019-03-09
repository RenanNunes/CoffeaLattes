var webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
        new webpack.EnvironmentPlugin([
            "API_URL", "PORT", "MONGODB_URI"
        ])
    ],
  }
};

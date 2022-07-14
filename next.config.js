module.exports = {
  trailingSlash: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.md/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: 'raw-loader'
        }
      ]
    });

    return config;
  },
  swcMinify: true,
  output: 'standalone',
};

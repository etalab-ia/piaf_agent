module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /^\/override.json/, to: '/override.json' }],
    },
    disableHostCheck: true,
  },
  publicPath: '/'
}

module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /^\/override.json/, to: '/override.json' }],
    },
    disableHostCheck: true,
  },
  // force a relative path link --> https://cli.vuejs.org/config/#publicpath
  publicPath: ''
}

const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  
  publicPath: process.env.NODE_ENV === 'production' ? '/Zero/' : '/',

  transpileDependencies: true,

  lintOnSave: false,

  devServer: {
    port: 8080,
    open: true
  },

  chainWebpack: config => {
    config.plugin('copy').tap(args => {
      const options = args[0]
      const patterns = options.patterns || (Array.isArray(options) ? options : [options])
      patterns.forEach(p => {
        if (p && p.globOptions && p.globOptions.ignore) {
          p.globOptions.ignore.push('**/index.html')
        }
      })
      return args
    })
  }
})
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,

  lintOnSave: false, // ✅ 关键：关闭 ESLint

  devServer: {
    port: 8080,
    open: true
  },

  // ✅ 关键修复：Windows 下 CopyWebpackPlugin 内部用 "/" 拼接的绝对路径
  // 来排除 public/index.html，导致在 Windows（路径用 "\"）上排除规则失效，
  // CopyWebpackPlugin 又把未注入资源的 public/index.html 复制进 dist，
  // 和 HtmlWebpackPlugin 生成的 index.html 撞名导致冲突报错。
  // 这里用跨平台的 glob 模式手动补一条排除规则。
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
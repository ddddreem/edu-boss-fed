const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      // 10. 设置公共引用，在每个 scss 文件加载前，webpack都会提前加上以下语句；
      scss: {
        additionalData: '@import "~@/styles/variables.scss";'
      }
    }
  }
})

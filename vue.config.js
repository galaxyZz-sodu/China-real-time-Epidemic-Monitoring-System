const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave: false,


  devServer: {
    proxy: {
      '/api': { //当路径出现/api时，开始请求以下服务器
        target: 'http://apis.juhe.cn',//聚合接口地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {//重写路径
          '^/api': ''
        }
      },
      '/foo': { //当路径出现/api时，开始请求以下服务器
        target: 'https://bang.360.cn',//聚合接口地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {//重写路径
          '^/foo': ''
        }
      },

    },
  },
})


import path from 'path'

// TODO: 重新定义配置文件格式
/*
  const config: Config = {

  }

*/
export default {
  // 可以使用相对路径, TODO: 修改了
  alias: {
    '~/': './',
    '@/': `${path.resolve(__dirname, './')}`
    // vue: 'vue'
    // vue: 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
  },
  publicDir: 'static',
  layoutsDir: 'layouts',
  pagesDir: 'pages',
  componentsDir: 'components',
  storeDir: 'store'
  /*
    envDir:
    @see server.proxy
    proxy: {}
  */
// build: {
//   //   rollupOptions: {
//   //     input: {
//   //       main: path.resolve(__dirname, '.normo/index.html')
//   //       // nested: resolve(__dirname, 'nested/index.html')
//   //     }
//   //   }
//   // }
}

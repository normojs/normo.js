import path from 'path'
import { defineConfig } from 'vite'
// vite对vue3 SFC的支持
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
// 布局
import Layouts from 'vite-plugin-vue-layouts'

export default defineConfig({
  // config packages https://github.com/vitejs/vite/issues/306
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, '')}/`,
      vue: 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
    }
  },
  publicDir: 'static',
  plugins: [
    // 支持vue
    Vue(),
    // 布局 https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({
      layoutsDir: 'layouts'
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      pagesDir: 'pages',
      extensions: ['vue', 'js', 'md'],
      replaceSquareBrackets: true
    }),
    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      dirs: ['components'],
      deep: false
    })
  ]
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(__dirname, '.normo/index.html')
  //       // nested: resolve(__dirname, 'nested/index.html')
  //     }
  //   }
  // }
})

// export default config

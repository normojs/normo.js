import path from 'path'
import { defineConfig } from 'vite'
// vite对vue3 SFC的支持
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'

export default defineConfig({
  alias: {
    '@/': `${path.resolve(__dirname, 'src')}/`
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, '.normo/index.html')
        // nested: resolve(__dirname, 'nested/index.html')
      }
    }
  },
  plugins: [
    Vue(),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // currently, vite does not provide an API for plugins to get the config https://github.com/vitejs/vite/issues/738
      // as the `alias` changes the behavior of middlewares, you have to pass it to ViteComponents to do the resolving
      // alias
    })
  ]
})

// export default config

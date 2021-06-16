#!/usr/bin/env node

// 配置文件
import path from 'path'
// vite对vue3 SFC的支持
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
// 布局
import Layouts from 'vite-plugin-vue-layouts'

// eslint-disable-next-line no-unused-vars
import { createServer } from 'vite'
import fs from 'fs'
import _ from './global.mjs'
// 源映射
// 配置文件，参考nuxt.config.js
// import viteConfig from '../normo.config.js'
import {buildConfig} from './build.mjs'

console.log(__dirname)

// 开发者的项目根路径
const projectRoot = process.cwd()

// import aa from `${projectRoot}/normo.config.ts`
const fileName = 'normo.config.ts'
const relativePath = path.relative(projectRoot, '/'+fileName)
const resolvePath = path.join(projectRoot, '/'+fileName)
// import config

console.log('框架默认配置: ', projectRoot, relativePath)
const defaultConfig = {
  // resolve.alias
  alias: {},
  plugins: {},
  publicDir: 'static'
}
// 合并配置
// 设置vite配置文件

// 1、读取配置文件 默认 normo.config.ts

// end、启动vite
//

// import xx from '../example/normo.config.ts.js'

;(async () => {
  const configJsCode = await buildConfig(resolvePath)
  fs.writeFileSync(resolvePath + '.js', configJsCode)
  let viteConfig = (await eval(`import('file://' + resolvePath + '.js')`))
          .default
  viteConfig = viteConfig.default ? viteConfig.default : viteConfig
  // 删除文件
  fs.unlinkSync(resolvePath + '.js')

  
  // if(!viteConfig){
  //   // viteConfig = require(resolvedPath)
  // }
console.log('Layouts: ', Layouts)
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: projectRoot,
    resolve: {
      alias: {
        '@/': `${path.resolve(projectRoot, '')}/`,
        vue: 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，如果使用其他的插件，可能会用到别名
        ...viteConfig.alias
      }
    },
    publicDir: viteConfig.publicDir?viteConfig.publicDir:'static',
    plugins: [
      // 支持vue
      Vue(),
      // 布局 https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        layoutsDir: viteConfig.layoutsDir?viteConfig.layoutsDir:'layouts'
      }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        pagesDir: viteConfig.pagesDir?viteConfig.pagesDir:'pages',
        extensions: ['vue', 'js', 'md'],
        replaceSquareBrackets: true
      }),
      // https://github.com/antfu/vite-plugin-components
      ViteComponents({
        dirs: [viteConfig.componentsDir?viteConfig.componentsDir:'components'],
        deep: false
      })
    ],
    server: {
      port: 1337
    }
  })
  await server.listen()
})()



#!/usr/bin/env node

import _ from './global.mjs'
import path from 'path'

import Vue from '@vitejs/plugin-vue'
import LayoutsPlugin from 'vite-plugin-vue-layouts'
import PagesPlugin from 'vite-plugin-pages'
import ViteComponentsPlugin from 'vite-plugin-components'

const Layouts = LayoutsPlugin.default?LayoutsPlugin.default:LayoutsPlugin
const Pages = PagesPlugin.default?PagesPlugin.default:PagesPlugin
const ViteComponents = ViteComponentsPlugin.default?ViteComponentsPlugin.default:ViteComponentsPlugin

import { createServer } from 'vite'
import fs from 'fs'
// 源映射
// 配置文件，参考nuxt.config.js
// import viteConfig from '../normo.config.js'
import {buildConfig} from './build.mjs'

// 开发者的项目根路径
const projectRoot = process.cwd()
const fileName = 'normo.config.ts'
const relativePath = path.relative(projectRoot, '/'+fileName)
const resolvePath = path.join(projectRoot, '/'+fileName)

// console.log('框架默认配置: ', __dirname, projectRoot, relativePath)

// 1、读取配置文件 默认 normo.config.ts

;(async () => {
  const configJsCode = await buildConfig(resolvePath, true)
  fs.writeFileSync(resolvePath + '.mjs', configJsCode)
  let viteConfig = (await eval(`import('file://' + resolvePath + '.mjs')`))
          .default
  viteConfig = viteConfig.default ? viteConfig.default : viteConfig
  // 删除文件
  fs.unlinkSync(resolvePath + '.mjs')

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
    publicDir: viteConfig.publicDir ? viteConfig.publicDir : 'static',
    plugins: [
      // 支持vue
      Vue(),
      // 布局 https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        layoutsDir: viteConfig.layoutsDir ? viteConfig.layoutsDir : 'layouts'
      }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        pagesDir: viteConfig.pagesDir ? viteConfig.pagesDir : 'pages',
        extensions: ['vue', 'js', 'md'],
        replaceSquareBrackets: false
      }),
      // https://github.com/antfu/vite-plugin-components
      ViteComponents({
        dirs: [viteConfig.componentsDir ? viteConfig.componentsDir : 'components'],
        deep: false
      })
    ],
    server: {
      port: 1337
    }
  })
  await server.listen()
})()



import path from 'path'
import { createServer } from 'vite'
import fs from 'fs'
import Vue from '@vitejs/plugin-vue'
import LayoutsPlugin from 'vite-plugin-vue-layouts'
import PagesPlugin from 'vite-plugin-pages'
import ViteComponentsPlugin from 'vite-plugin-components'

const _eval = require('eval')


const Layouts = LayoutsPlugin
const Pages = PagesPlugin
const ViteComponents = ViteComponentsPlugin
import {buildConfig} from './build'
// 开发者的项目根路径
const projectRoot = process.cwd()
const fileName = 'normo.config.ts'
const relativePath = path.relative(projectRoot, '/'+fileName)
const resolvePath = path.join(projectRoot, '/'+fileName)


// 1、读取配置文件 默认 normo.config.ts
;(async () => {
  const configJsCode = await buildConfig(resolvePath, false)
  fs.writeFileSync(resolvePath + '.js', configJsCode)
  let viteConfig = (await eval(`import('file://' + resolvePath + '.js')`))
  .default

  // console.log('xxxxxxxxx;:', _eval(configJsCode, true))
  console.log('xxx" ', viteConfig)
  viteConfig = viteConfig.default ? viteConfig.default : viteConfig

  // 删除文件
  fs.unlinkSync(resolvePath + '.js')

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
    // TODO: 布局、组件、页面、store、中间件、插件
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
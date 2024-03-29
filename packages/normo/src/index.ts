import path from 'path'
import Vue from '@vitejs/plugin-vue'

import { createServer } from 'vite'

import {resolveAlias, getConfigList} from './utils'

// TODO: 调用 @normojs-core-* 包
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
// import ViteComponents from 'vite-plugin-components'
import ViteComponents from 'unplugin-vue-components/vite'
import Store from '@normo/store'


import {$eval} from './eval'

import {buildConfig} from './build'
// 开发者的项目根路径，调用normo命令的地址
const cwdPath = process.cwd()
// const curPath =  path.resolve('../../',__dirname)
// console.log('curPath:', curPath)
import {log} from './utils'
import {config, usages} from './command'
log.green(`custom config: ${JSON.stringify(config)}`)
// TODO: 处理命令行命令参数，获取默认的配置项
// 默认的配置对象
// const defaultConfig:any = {};

// // 使用样例集合
// const usageList:any = [];
;(async () => {
// TODO: merge
// let options = mergeOtions(defaultConfig, program);



let configList = await getConfigList(cwdPath, '')
// TODO: 判断是否存在

// TODO: 获取最终的配置


// 返回相对路径
const relativePath = path.relative(cwdPath, '/'+config.config).replace(/\\/g, '/')
// 返回绝对路径
const resolvePath = path.join(cwdPath, '/'+config.config).replace(/\\/g, '/')

// TODO: xxx

let configJsCode:string = 'module.exports = {}'
// 1、读取配置文件 默认 normo.config.ts

  configJsCode = await buildConfig(resolvePath, false)
  
  // 使用@microflows/nodevm
  let viteConfig =  await $eval(configJsCode)
  viteConfig = viteConfig.default ? viteConfig.default : viteConfig
  
  log.green(`file config: ${JSON.stringify(viteConfig)}`)
  console.log('----:cwdPath>', path.resolve(cwdPath,'./'))
  console.log("cwdPath", path.resolve(cwdPath, './node_modules/normo/node_modules/vue'))
  // TODO: 默认配置
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: cwdPath,
    resolve: {
      // alias:[
      //   {
      //     find: '@/', replacement: path.resolve(cwdPath,'/')
      //   },

      // ],
        alias: {
          // macos
          // '@/': path.resolve(cwdPath,'/'),
          '@': path.resolve(cwdPath,'./'),
          vue$: 'vue/dist/vue.esm-bundler.js'
          
          // 'vue':'vue/dist/vue.esm-bundler.js'
          // 'vue': path.resolve(cwdPath,'./node_modules/normo/node_modules/vue/dist/vue.esm-bundler.js'),
          // 'vue-router': path.resolve(cwdPath,'./node_modules/normo/node_modules/vue-router'),
          // 'vuex':  path.resolve(cwdPath, './node_modules/normo/node_modules/vuex'),
          // 'vuex':  path.resolve(cwdPath, './node_modules/normo/node_modules/vuex'),
          // // /dist/vue.esm-bundler.js
          // 'vue': path.resolve(cwdPath,'./node_modules/normo/node_modules/vue/dist/vue.esm-bundler.js')
        }
    },
    //   alias: {
    //     'vue': `normo/node_modules/vue`,
    //     'vue-router': `normo/node_modules/vue-router`,
    //     // vue: 'vue/dist/vue.esm-bundler.js'
    //     // 'vuex': './normojs/node_modules/vuex',
    //     '@/': `${path.resolve(cwdPath, '')}/`,
    //     // 相对路径转绝对路径
    //     // ...resolveAlias(cwdPath, viteConfig.alias)
    //   }
    // },
    // TODO: 重写logger
    // logger: {},
    publicDir: viteConfig.publicDir || 'static',
    // TODO: 布局、组件、页面、store、中间件、插件
    plugins: [
      // 支持vue
      Vue(),
      // 布局 https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        layoutsDir: viteConfig.layoutsDir || 'layouts'
      }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        pagesDir: viteConfig.pagesDir || 'pages',
        extensions: ['vue', 'js', 'md'],
        replaceSquareBrackets: false
      }),
      // https://github.com/antfu/vite-plugin-components
      // TODO: 支持数组
      ViteComponents({
        dirs: [viteConfig.componentsDir || 'components'],
        deep: false
      }),
      // 状态：
      // @ts-ignore
      Store({
        base: 'vuex',
        storeDir: viteConfig.storeDir || 'store',
        extensions: ['ts', 'js']
      })
    ],
    server: {
      host: config.host,
      port: config.port,
      force: config.force,
      hmr: false
    }
  })
  await server.listen()
})()
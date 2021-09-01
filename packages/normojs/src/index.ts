import path from 'path'
import Vue from '@vitejs/plugin-vue'

import normoCliConfig from './normo.cli.config'

import { createServer } from 'vite'
import { Command } from 'commander'
const chalk = require('chalk')
const program = new Command()
program.name('normo')

import {resolveAlias, getConfigList} from './utils'

// TODO: 调用 @normojs-core-* 包
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
import Store from 'vite-plugin-store'


import {$eval} from './eval'

import {buildConfig} from './build'
// 开发者的项目根路径
const projectRoot = process.cwd()


// TODO: 处理命令行命令参数，获取默认的配置项
// 默认的配置对象
const defaultConfig:any = {};

// 使用样例集合
const usageList:any = [];

// 遍历配置到当前的程序里面
Object.entries(normoCliConfig).forEach(([key, value]) => {
    defaultConfig[key] = value.default;
    usageList.push(value.usage)
    program.option(value.option, value.descriptor);
});

// 监听--help事件，在命令行显示样例
program.on('--help',function () {
    console.log('Examples:');
    usageList.forEach((line:any)=>{
        console.log(`  ${chalk.green(line)} \r`);
    })
})
// 解析用户执行时的参数
program.parse(process.argv); 

// TODO: merge
let options = mergeOtions(defaultConfig,program);


const fileName = 'normo.config.ts'

let configList = await getConfigList(projectRoot, '')
// TODO: 判断是否存在

// TODO: 获取最终的配置


// 返回相对路径
const relativePath = path.relative(projectRoot, '/'+fileName).replace(/\\/g, '/')
// 返回绝对路径
const resolvePath = path.join(projectRoot, '/'+fileName).replace(/\\/g, '/')

// TODO: xxx

let configJsCode:string = 'module.exports = {}'
// 1、读取配置文件 默认 normo.config.ts


;(async () => {
  configJsCode = await buildConfig(resolvePath, false)
  
  // 使用@microflows/nodevm
  let viteConfig =  await $eval(configJsCode)
  viteConfig = viteConfig.default ? viteConfig.default : viteConfig
  
  
  // TODO: 默认配置
  const server = await createServer({
    // any valid user config options, plus `mode` and `configFile`
    configFile: false,
    root: projectRoot,
    resolve: {
      alias: {
        // '@/': `${path.resolve(projectRoot, '')}/`,
        // 相对路径转绝对路径
        ...resolveAlias(projectRoot, viteConfig.alias)
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
      }),
      // 状态：
      Store({
        storeDir:  viteConfig.storeDir ? viteConfig.storeDir : 'pages',
        extensions: ['ts', 'js']
      })
    ],
    server: {
      port: 1337
    }
  })
  await server.listen()
})()
#!/usr/bin/env node

// 源映射

// 配置文件，参考nuxt.config.js
import viteConfig from '../normo.config'

// 开发者的项目根路径
const projectRoot = process.cwd()

console.log('viteConfig: ', viteConfig)
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

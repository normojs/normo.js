#!/usr/bin/env node

// eslint-disable-next-line no-unused-vars
import path from 'path'
import _ from './global.mjs'
// 源映射
// 配置文件，参考nuxt.config.js
import viteConfig from '../normo.config.js'
import { build } from 'esbuild'

console.log(__dirname)

// 开发者的项目根路径
const projectRoot = process.cwd()

const configFilePath = path.relative(projectRoot, '/normo.config.ts')
// import config

console.log('框架默认配置: ', projectRoot, build, configFilePath)
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

import { resolve } from 'path'
import type { Plugin, ResolvedConfig } from 'vite'
import { ResolvedOptions, UserOptions, ModuleOptions } from './types'
import { getFilesFromPath } from './files'
import { generateOptions, generateClientRoot } from './generate'
import { debug, normalizePath } from './utils'
import { handleHMR } from './hmr'
import { resolveOptions } from './options'
import { MODULE_IDS, MODULE_ID_VIRTUAL } from './constants'

import { generateCode } from './generateCode'
let generateRoot: { moduleOptions: { [x: string]: any } } = {moduleOptions:{}}

function storePlugin(userOptions: UserOptions = {}): Plugin {
  let config: ResolvedConfig | undefined
  let moduleOptions: ModuleOptions[]

  let storeFilePaths: string[] = [] // []
  let resolveStoreDir = '' // 'e://xxx/store'

  const options: ResolvedOptions = resolveOptions(userOptions)

  return {
    name: MODULE_ID_VIRTUAL,
    enforce: 'pre',
    async configResolved(_config) {
      config = _config
      options.root = config.root
      resolveStoreDir = normalizePath(resolve(options.root, options.storeDir))
      // TODO: 变成了绝对路径，使用
      options.resolveStoreDir = resolveStoreDir
      // options.storeDir = resolveStoreDir

      //
      storeFilePaths = await getFilesFromPath(options.storeDir, options.extensions, options.exclude)
    },
    resolveId(id) {
      if(id == MODULE_ID_VIRTUAL){
        return MODULE_ID_VIRTUAL
      }
    },
    async load(id) {
      if (id === MODULE_ID_VIRTUAL) {
        // 相对路径数组

        const storeOptions = generateOptions(storeFilePaths, options.storeDir, options)
        moduleOptions = storeOptions.moduleOptions
        // TODO: 插件
        // pluginOptions = storeOptions.pluginOptions

        // 生成code
        let result = generateClientRoot(moduleOptions, options)
        generateRoot.moduleOptions = result.moduleOptions
        const root: any = result
        // return clientCode
        // TODO: 判断是否为开发环境
        /*
          TODO: 原理，在最外层mutations添加一个更新state的方法，更新相应模块的state
          判断是否开启 namespaced
          __init_${modulename}__(state: any, data: any){}
        */

        // const exportCode = ''//readFileSync(join(__dirname, './epxortCode.ts'), 'utf-8')
        return generateCode(root, userOptions)
      }
    },
    configureServer(server) {
      // const { ws, watcher } = server
      // handleHMR(server, generateRoot, options, storeFilePaths)
      handleHMR(server, options, generateRoot)
    },
    async handleHotUpdate(ctx) {
      const { file, server } = ctx
      // 热加载
      const isPagesDir = file.startsWith(`${resolveStoreDir}/`)
      if (isPagesDir) {
        const { moduleGraph } = server
        const module = moduleGraph.getModuleById(MODULE_ID_VIRTUAL)
        debug.hmr('hmr update: %s', file.replace(options.root, ''))

        // TODO: 判断修改的文件, 如果修改了index文件、或state文件，则全局刷新
        // TODO: v2 如果修改了index文件里的state方法，则全局刷新
        return [module!]
      }
    },
  }
}

export * from './types'
export default storePlugin

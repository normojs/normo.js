
import { ViteDevServer } from 'vite'
import { debug, normalizePath, slash, getPathName } from './utils'
import { ResolvedOptions } from './types'
import { HMR_MODULE_NAMES } from './constants'
export function handleHMR(
  server: ViteDevServer,
  options: ResolvedOptions,
  generateRoot:any,
  storeFilePaths?: string[],
) {
  const { ws, watcher } = server

  function fullReload() {
    ws.send({
      type: 'full-reload',
    })
  }

  watcher.on('add', (file) => {
    const path = slash(file)
    debug.hmr('add', path)
    fullReload()
  })
  watcher.on('unlink', (file) => {
    const path = slash(file)
    debug.hmr('remove', path)
    fullReload()
  })

  // TODO: 删除、添加
  watcher.on('change', (file) => {
    const path = slash(file)
    const isStoreDir = path.startsWith(`${options.resolveStoreDir}/`)

    /* const hotEvent: any = {
      // type: state、full-reload、hot-update
      type: 'hot-update',
    } */

    // console.log(';;;;;;;;;isStoreDir: ', isStoreDir, options)

    if (isStoreDir) {
      const fileName = getPathName(path)
      // 如果修改的文件名: mutations、actions、getters
      if (HMR_MODULE_NAMES.includes(fileName)) {
        let moduleOption = generateRoot.moduleOptions.filter((item:any)=>{
            // console.log('--: \n', item.fullPath, '\n', path)
            // console.log('============')
            return path == item.fullPath
          })
        server.ws.send({
          type: 'custom',
          event: 'vite-plugin-store-update',
          data: { // hotEvent
            // 废弃字段
            type: 'hot-update',
            // TODO: 填写 state、index、getters等
            module: fileName, // getters/mutations/actions
            file: path,
            option: moduleOption
            // generateRoot
          },
        })
      } // not in HMR_MODULE_NAMES
      else {
        fullReload()
      }
    }// end if(isStoreDir)
  })
}

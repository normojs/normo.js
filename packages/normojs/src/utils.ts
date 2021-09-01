import fg from 'fast-glob'
import path from 'path'
import {clone}  from 'lodash'
const EMPTY_STRING = ''
export function resolveAlias(rootPath:string, paths: any){
  let obj = clone(paths)
  Object.keys(obj).forEach(key=>{
    obj[key] = path.resolve(rootPath, obj[key])
  })
  return obj
}

/**
 * 获取开发者项目的module列表
 * @param rootPath 
 * @returns []
 * @deprecated 从用户配置获取
 */
export function modulesList(rootPath: string){

}

export function extensionsToGlob(extensions: string[]|undefined) {
    return (extensions && extensions.length > 1) ? `{${extensions.join(',')}}` : (extensions && extensions[0]) || ''
}


export async function getConfigList(rootPath:string, name: string) {
  let sources: string|string[]
  if(name.endsWith('.js') || name.endsWith('.ts')){
    sources = name
  }else {
    sources = ['normojs.config.js','normojs.config.ts']
  }
  
  const files = await fg(sources, {
    onlyFiles: true,
    cwd: rootPath,
  })

  return files
}

export async function getFilesFromPath(path: string, extensions?: string[], exclude?: string[]): Promise<string[]> {
    const ext = extensionsToGlob(extensions)
  
    const files = await fg(`*.${ext}`, {
      ignore: ['node_modules', '.git', '**/__*__/*', ...exclude!],
      onlyFiles: true,
      cwd: path,
    })
  
    return files
  }
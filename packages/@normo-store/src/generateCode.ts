export const generateCode = function(root: any, userOptions: UserOptions = {}) {
 
  const importVuexCode = `import { createStore } from '${userOptions.base || 'vuex'}'`
  return `
  export const root = ${JSON.stringify({ ...root })}
  ${importVuexCode}
  // ================= 生成了store code ==================
  // TODO: loadModules(fileList)方法，生成root.code
  function loadModules() {
    // const codes = []
    // for (const name of root.moduleNames) {
    //   codes.push(root.modules[name].imports.join('\\n'))
    //   codes.push(root.modules[name].variables.join('\\n'))
    // }
    
    // codes.push(root.modules.__root__.imports.join('\\n'))
    // codes.push(root.modules.__root__.variables.join('\\n'))
    // return codes

    return generatedStore
  }
  ${root.code}
  const codes = loadModules()

  // ================= end store code ==================

  /* 热加载 */

  // ================= 公共方法 ==================
  /**
   * 设置generatedStore下modules属性namespaced
   * @params {Object} 生成的store code，即：createStore(store)中的store
   */
  function setModulesNamespaced(moduleRoot) {
    if (!moduleRoot.modules) {
      // 结束回调
      return true
    }
    for (const moduleKey in moduleRoot.modules) {
      const module = moduleRoot.modules[moduleKey]
      if (module.namespaced === undefined) {
        // namespaced 默认值为false|undefined
        module.namespaced = true
      }
      setModulesNamespaced(module)
    }// end for
  }
  // ================= end 公共方法 ==================

  // 判断是否开启全局 namespaced，默认开启全局命名空间
  if (generatedStore.namespaced === true) {
    // 如果全局开启，则添加到模块
    setModulesNamespaced(generatedStore)
  }
  const $normo = createStore(generatedStore)
  if(window){
    window.$normo = $normo
  }
  export const store = $normo
  export { generatedStore }

  const loadingTime = Date.now()
  const lastHotTime = loadingTime
  console.log('[vite-plugin-store] loading: ', loadingTime)

  const hotModules = ['getters','mutations','actions']

  let hotEvent = new Proxy({}, {
    set(target, key, value) {
      if(value && hotModules.includes(value.module)){
        // TODO: store.hotUpdate()
        console.log('hot-event: ', value)
        import('/store/actions.ts').then(resp=>{
          console.log('store: resp', resp, generatedStore)
        })
      }else{

      }
      return Reflect.set(target, key, value);
    }
  })
  if (import.meta.hot) {
    import.meta.hot.on('vite-plugin-store-update', (data) => {
      // TODO: 有时会有两次的更新，做防止抖动
      // 判断类型
      hotEvent.data = data
      console.log('通知：自定义---------------------------globalVar', loadingTime, data)
    })
    // 

  }// end if

  // ============================================================

  `
}

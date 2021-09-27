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
      // @see packages/@normo-store/src/hmr.ts#52
      let hotEventData = value
      if(value && hotModules.includes(value.module)){
        // TODO: store.hotUpdate()
        console.log('热加载参数: ', hotEventData)
        console.log('热加载资源：', generatedStore)
        /*
          TODO: 根据moduleOption.resolvedPath或moduleOption.moduleName
          获取到最上乘的module，修改当前module，然后更新
        */
        let moduleOption  = hotEventData.option[0]
        // 根据moduleName获取root module
        // 根据moduleName和moduleInType获取...
        import('/store/user/role/getters.ts').then(resp=>{
          console.log('store: resp', resp, generatedStore)
        })
      }else{
        // TODO: 更新state
      }
      return Reflect.set(target, key, value);
    }
  })
  if (import.meta.hot) {
    import.meta.hot.on('vite-plugin-store-update', (data) => {
      // 触发hotEvent set ↑↑↑
      hotEvent.data = data 
    })
    // 

  }// end if

  // ============================================================

  `
}

const vm = require('vm')
const isBuffer = Buffer.isBuffer

const requireLike = require('require-like')

function merge (a:any, b:any) {
  if (!a || !b) return a
  let keys = Object.keys(b)
  for (let k, i = 0, n = keys.length; i < n; i++) {
    k = keys[i]
    a[k] = b[k]
  }
  return a
}

const defaultConfig = {
  filename: '',
  scope: {},
  global: false
}

// Return the exports/module.exports variable set in the content
// content (String|VmScript): required
// filename:string, scope:string, includeGlobals:boolean
export const _eval = function (content:string|Buffer, config:{}) {
  let _config = {...defaultConfig, ...config}
  // Object.assign(config, defaultConfig)

  // Expose standard Node globals
  var sandbox:any = {}
  var exports = {}
  var _filename = _config.filename //|| module.parent.filename;

  if (_config.global) {
    Object.assign(sandbox, global)
    // TODO: __dirname、__filename、atob等

    // console is non-enumerable in node v10 and above
    sandbox.console = global.console
    // process is non-enumerable in node v12 and above
    sandbox.process = global.process
    sandbox.URL = global.URL
    // TODO: 是否使用path process.cwd() 等
    sandbox.require = requireLike(_filename)
  }

  Object.assign(sandbox, _config.scope)


  sandbox.exports = exports
  sandbox.module = {
    exports: exports,
    filename: _filename,
    id: _filename,
    parent: module.parent,
    require: sandbox.require || requireLike(_filename)
  }
  sandbox.global = sandbox

  var options = {
    filename: _config.filename,
    displayErrors: false
  }

  if (isBuffer(content)) {
    content = content.toString()
  }

  // Evalutate the content with the given scope
  if (typeof content === 'string') {
    var stringScript = content.replace(/^\#\!.*/, '')
    var script = new vm.Script(stringScript, options)
    script.runInNewContext(sandbox, options)
  } else {
    // @ts-ignore
    content.runInNewContext(sandbox, options)
  }

  // return sandbox.module.exports
  return sandbox
}
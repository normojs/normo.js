/* normojs 命令参数 */
// --host 0.0.0.0 --port 3333 --config normo.config.ts
export default {
  'host':{
    option: '-h, --host <v>',
    descriptor: 'set your server host',
    defaultValue: '127.0.0.1',
    usage: 'normo --host 127.0.0.1'
  },
  'port':{
    option: '-p, --port <n>',
    descriptor: 'set your server port',
    defaultValue: '3301',
    usage: 'normo --port 3301'
  },
  'mode':{
    option: '-m, --mode <n>',
    descriptor: 'set project run mode, eg: development、production',
    usage: 'normo --config development'
  },
  'config':{
    option: '-c, --config <n>',
    descriptor: 'set project config',
    defaultValue: 'normo.config,vite.config',
    usage: 'normo --config normo.config.js'
  },
  'force':{
    option: '-f, --force',
    descriptor: 'set reset cache',
    defaultValue: false,
    usage: 'normo --force'
  }
}
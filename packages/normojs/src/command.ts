import { Command } from 'commander'
const program = new Command()
program.name('normo')

import {log} from './utils'
import normoCliConfig from './normo.cli.config'
// 默认的配置对象
const defaultConfig:any = {};
// 使用样例集合
const usages:any = [];
// 遍历配置到当前的程序里面
Object.entries(normoCliConfig).forEach(([key, value]:any) => {
  defaultConfig[key] = value.defaultValue;
  usages.push(value.usage)
  
  // cli提示设置
  program.option(value.option, value.descriptor);
});

// 监听--help事件，在命令行显示样例
program.on('--help', function () {
  console.log('Examples:');
  usages.forEach((line:any)=>{
    log.green(`${line}\r`)
  })
})
// 解析用户执行时的参数
program.parse(process.argv);
const config= {
  ...defaultConfig,
  ...program.opts()
}
export {
  config,
  usages
}

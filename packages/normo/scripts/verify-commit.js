// Invoked on the commit-msg git hook by yorkie.
// TODO 组件依赖
const chalk = require('chalk')
const msgPath = process.env.GIT_PARAMS
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()

/*
  feat：增加一个新功能
  fix：修复bug
  docs：只修改了文档
  style：做了不影响代码含义的修改，空格、格式化、缺少分号等等
  refactor：代码重构，既不是修复bug，也不是新功能的修改
  perf：改进性能的代码
  test：增加测试或更新已有的测试
  chore：构建或辅助工具或依赖库的更新
  other: 其他，不推荐使用
*/
const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore|types|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      '提交信息的格式错误.'
    )}\n\n` +
      chalk.red('  提交日志需要规定的消息格式. 如:\n\n') +
      `    ${chalk.green('feat(utils): 添加\'sleep\'方法')}\n` +
      `    ${chalk.green(
        'fix(utils): \'contains\'判断数组出错 (close #I29WLB)'
      )}\n\n` +
      chalk.red(' 详情查看 documents/commit-convention.md \n')
  )
  process.exit(1)
}

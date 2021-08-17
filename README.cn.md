## 还在开发中，请不要再生产环境中使用

# normojs

#### 介绍 - 开发中，请不要在开发环境中使用... ...
一个类似nuxtjs的框架，基于vue3、vite2



### lerna







## Template

branch: [template](./tree/template )



## Framework



## Framework

branch: [master](./tree/master)



## 目录结构

```js
|- project
    |- conponents // 组件，自动导入
    |- layouts // 布局，类似nuxtjs的布局，但使用方式不同
    |- pages // 页面
    |- static // 静态文件
    |- index.html // 程序入口
    |- normo.config.ts // （自己的项目可以为纯js，但当前文件必须是这个名字和后缀，当前文件的转换由框架esbuild处理）同vite.config.js 可在package.json#script:normo修改
    |- package.json // 
```





#### 软件架构
*  [Vue3](https://github.com/vuejs/vue-next), [Vite2](https://github.com/vitejs/vite), [ESBuild](https://github.com/evanw/esbuild)
* [基于文件系统的路由](https://github.com/hannoeru/vite-plugin-pages)
* [按需自动导入组件](https://github.com/antfu/vite-plugin-components)
* TypeScript
* [standardjs](https://github.com/standard/standard) - 代码规范

#### 安装教程

```shell
# 下载代码
git clone https://gitee.com/source-code-online/normojs.git

cd normojs

# 安装依赖包
yarn i

# 本地调试normojs
npm link

# 运行normojs
yarn run dev

# 运行demo
yarn run example:dev
```



#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx



doc: https://juejin.cn/post/6844903702453551111

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
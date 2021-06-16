## Do not use it in production

# normojs

[中文](./README.cn.md)

#### Fork https://github.com/kn0wn/vitesse-lite 

Imitate the directory structure of nuxt.js base vite2、vue3



## Template

branch: [template](./tree/template )



## Framework

branch: [master](./tree/master)





## structure

```js
|- project
    |- conponents // 组件，自动导入
    |- layouts // 布局，类似nuxtjs的布局，但使用方式不同
    |- pages // 页面
    |- static // 静态文件
    |- index.html // 程序入口
    |- normo.config.ts // （自己的项目可以为纯js，但当前文件必须是这个名字和后缀，当前文件的编译由框架esbuild处理）同vite.config.js 可在package.json#script:normo修改
    |- package.json // 
```





<br>

## Features

- ⚡️ [Vue3](https://github.com/vuejs/vue-next), [Vite2](https://github.com/vitejs/vite), [ESBuild](https://github.com/evanw/esbuild) - born with fastness
- 🗂 [File based routing](./src/pages)
- 📲 [Components auto importing](./src/components)
- 🦾 TypeScript, of course
- [standardjs](https://github.com/standard/standard) - 代码规范

<br>

## Pre-packed

### Plugins

- [Vue Router](https://github.com/vuejs/vue-router)
  - [vite-plugin-page](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
- [vite-plugin-components](https://github.com/antfu/vite-plugin-components) - components auto import

### Coding Style

- Use Composition API with [`<script setup>` SFC](https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-script-setup.md)

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
  - [Vue TypeScript Plugin](https://github.com/znck/vue-developer-experience/tree/master/packages/typescript-plugin-vue) - better type support for Vue
- [VS Code Extensions](./.vscode/extensions.json)
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Try it now!

### Github Template

[Create a repo from this template on Github](https://github.com/fulus06/normo.js/generate).

### Clone to local

```shell
# clone
git clone https://github.com/fulus06/normojs.git

# or 国内下载代码
git clone https://gitee.com/source-code-online/normojs.git

cd ./normojs

# install node_modules
yarn install

npm link --force
# run
yarn run dev
```



## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Rename `name` field in `package.json`
- [ ] Change the title in `index.html`
- [ ] Change the favicon in `public`
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

## Usage

### Development

Just run and visit http://localhost:3000

```bash
npm run dev
```

### Build

To build the App, run

```bash
npm run build
```

And you will see the generated file in `dist` that is ready to be served.

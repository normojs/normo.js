### layout工作原理

> 在layouts目录下
>
> 参考：
>
> https://zh.nuxtjs.org/docs/2.x/directory-structure/layouts
>
> 中文网：https://www.nuxtjs.cn/guide/views
>
> https://itnext.io/vue-tricks-smart-layouts-for-vuejs-5c61a472b69b
>
> https://nickescobedo.com/1252/easy-way-to-have-multiple-layouts-for-your-vue-js-app
>
> 中文：https://www.cnblogs.com/duanzhenzhen/p/13045613.html



实现原理猜测：

* 使用插槽



类似于组件

```vue
<!-- layouts/index.vue 对所有页面有效 -->
<template>
	<header>头部</header>
	<normo />
	<footer>底部</footer>
</template>
```

```vue
<!-- pages/home.vue -->
<template>
	<div>
        页面内容
    </div>
</template>
<script>
export default {
    layout: 'index',
    // OR
    layout (context) {
        return 'index'
    }
}
</script>

```


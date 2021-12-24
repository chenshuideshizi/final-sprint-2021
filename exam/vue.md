## vue 基础

#### 1. Vue的基本原理

- 遍历data中的属性
- setter 更新，getter 依赖收集
- 渲染的时候访问属性把自身 watcher 添加到 dep

### 2. Vue响应式原理
- Observe 数据响应式
- compile 渲染模板，解析模板指令(v-model)，绑定更新函数
- watcher 建立桥梁
    - 在自身实例化时往属性订阅器(dep)里面添加自己 
    - 自身必须有一个update()方法 
    - dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调

1. 数据变化 -> 视图更新
2. 视图交互变化(input) -> 数据model变更

### 3. slot是什么？有什么作用？原理是什么？

slot又名插槽，是Vue的内容分发机制

默认插槽 具名插槽 作用域插槽

实现原理：

当子组件实例化时，获取到父组件传入的 slot 标签的内容，存放在 vm.$slot 中，默认插槽为 vm.$slot.default，具名插槽为 vm.$slot.xxx，xxx 为插槽名。

当组件执行渲染函数时候，遇到slot标签，使用$slot中的内容进行替换。此时可以为插槽传递数据，若存在数据，则可称该插槽为作用域插槽。

### 4. v-if、v-show、v-html 的原理

- v-if: 三元表达式，不会生成vnode,不会渲染
- v-show: display: none
- v-html: innerHTML

### 5. data为什么是一个函数而不是对象

对象是引用类型，多个实例引用同一个对象时，对一个实例进行操作，其他实例中也会发生变化

使用函数，每次都返回新的对象

### 6. 对keep-alive的理解，它是如何实现的，具体缓存的是什么？

内置组件，用于保存组件的状态，防止多次渲染

通过 cache 数组缓存所有组件的 vnode 实例。

当 cache 内原有组件被使用时会将该组件 key 从 keys 数组中删除，然后 push 到 keys数组最后，以便清除最不常用组件。

### 7. $nextTick 原理及作用

nextTick 本质是对 JavaScript 执行原理 EventLoop 的一种应用。

Promise 、MutationObserver、setImmediate、setTimeout

多次对一个或多个属性赋值，只会重新渲染一次，可以减少一些无用渲染

### 8. Vue中封装的数组方法有哪些，其如何实现页面更新

push, pop, shift, unshift, splice, reverse, sort

- 当调用修改原数组的方法,调用 dep.notify()
- 如果插入数据 push, unshift, splice， 调用 observeArray(如果插入的是对象，则变为响应式)

### 9. Vue template 到 render 的过程

template -> ast -> render

1. 调用 parse 方法将 template 转化为ast
2. 对静态节点做优化
3. 生成代码


### 10. Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

- Vue 在更新 DOM 时是异步执行的。
- 只要侦听到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
- 如果同一个watcher被多次触发，只会被推入到队列中一次。
- 在下一个的事件循环tick中，Vue 刷新队列并执行实际工作。



### 11. 简述 mixin、extends 的覆盖逻辑

都是用于合并、拓展组件的，两者均通过 mergeOptions 方法实现合并

data, provide, props, methods, inject, computed, el, propsData, watch, hooks

### 12. Vue是如何收集依赖的？

### 13. Vue模版编译原理
- 解析阶段：使用大量的正则表达式对template字符串进行解析，将标签、指令、属性等转化为抽象语法树AST。
- 优化阶段：遍历AST，找到其中的一些静态节点并进行标记，方便在页面重渲染的时候进行diff比较时，直接跳过这一些静态节点，优化runtime的性能。
- 生成阶段：将最终的AST转化为render函数字符串。

### 14. Vue的性能优化有哪些

（1）编码阶段

1. 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
2. v-if和v-for不能连用
3. 如果需要使用v-for给每项元素绑定事件时使用事件代理
4. SPA 页面采用keep-alive缓存组件
5. 在更多的情况下，使用v-if替代v-show
6. key保证唯一
7. 使用路由懒加载、异步组件
8. 防抖、节流
9. 第三方模块按需导入
10. 长列表滚动到可视区域动态加载
11. 图片懒加载

（2）SEO优化

- 预渲染
- 服务端渲染SSR

（3）打包优化

1. 压缩代码
2. Tree Shaking/Scope Hoisting
3. 使用cdn加载第三方模块
5. 多线程打包happypack
5. splitChunks抽离公共文件
6. sourceMap优化

（4）用户体验

- 骨架屏
- PWA
- 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启gzip压缩等。

###  15. vue初始化页面闪动问题

在vue初始化之前，由于div是不归vue管的

解决办法： style="display: none;" :style="{display: 'block'}"

### 16. mixin 和 mixins 区别

## 生命周期

### 1. 说一下Vue的生命周期

正常生命周期，keep-alive 生命周期

### 2. Vue 子组件和父组件执行顺序

- 加载渲染过程：
- 更新过程：
- 销毁过程：

## 组件通信

父子，兄弟,跨层级



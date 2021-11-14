# Vue 面试资料整理

### 1. 你了解 Vue 的双向绑定原理吗

所谓的双向绑定原理是建立在 MVVM 模型基础上的：

* 数据层 Model: 应用的数据及业务逻辑
* 视图层 View: 应用的展示效果，各类的 UI 组件等
* 业务逻辑层 viewModel: 负责将数据和视图关联起来

1. 数据变化后更新视图
2. 视图变化后更新数据

包含2个主要的部分：

* 监听器 Observer: 对所有的数据属性进行监听
* 解析器 Compiler: 对每个元素节点的指令进行扫描我解析，根据指令替换数据，绑定对应的更新数据

#### 具体的实现原理

1. new Vue() 执行初始化，对 data 通过 Object.defineProperty 进行响应化处理，这个过程发生在 Observer 中，每个 key 对应一个 Dep 实例，用于存储 Watcher 实例数组
2. 对模板进行编译时，v- 开头的关键词作为指令解析，找到动态绑定的数据。从 data 中获取数据并初始化视图，这个过程发生在 Compiler 里，如果遇到了 v-model, 就监听 input 事件，更新 data 对应的数值。
3. 在解析指令的过程中，会定义一个更新函数和watcher，之后对应的数据变化时 Watcher 会调用更新函数。new Watcher 的过程中会去读取 data 的 key，触发 getter 的依赖收集，将对应的 watcher 添加到 dep 里。
4. 将来 data 中的数据一旦发生变化，会首先找到对应的 dep，通知所有的 watcher 执行更新函数

### 2. 简单实现一个响应式函数？能对一个对象内的所有key添加响应式特性?要求最终输出如下方代码所示

```js
const reactive = (obj) => {

}

const data  = {
  a: 1,
  b:  2,
  c: {
    c1: {
      af: 999
    },
    c2: 4
  }
}

reactive(data)

data.a = 5 // SET key=a val=5
data.b = 7 // SET key=b val=7
data.c.c2 = 4 //
data.c.c1.af  = 121 // SET key af val121
```

**实现**

```js
const render = (key, val) => {
  console.log(`SET key=${key} val=${val}`)
}

const defineReactive = (obj, key, val) => {
  reactive(val) // 递归
  Object.defineProperty(obj, key, {
    get() {
      return val
    }
    set(newVal) {
      if (val === newVal) {
        return
      }

      val = newVal
      render(key, val)
    }
  })
}

const reactive = (obj) => {
  // 可以做为递归的终止条件
  if (typeof obj === 'object') {
    for (const key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}
```


### 3. vue 对于数组类型是怎么处理的？你能简单模拟一下对于数组方法的监听吗？

```js
const reactive = (obj) => {

}

const data = [1, 2, 3, 4]
reactive(data)

data.push(5) // Action=push, args=5
data.splice(0, 2) // Action=splice, args=0,2
```
**实现**

```js
const render = (action, ...args) => {
  console.log(`Action=${action}, args=${args.join(',')}`)
}

const arrPrototype = Array.prototype // 保存数组的原型
const newArrPrototype = Object.create(arrPrototype) // 创建一个新的数组原型

;['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(methodName => {
  newArrPrototype[methodName] = function () {
    // 执行原有数组方法
    arrPrototype[methodName].call(this, ...arguments)
    // 触发渲染
    render(methodName, ...arguments)
  }
})
const reactive = (obj) => {
  if (Array.isArray(obj)) {
    // 把新定义的原型对象指向 obj.__proto__
    obj.__proto__= newArrPrototype
  }
}

const data = [1, 2, 3, 4]
reactive(data)

data.push(5) // Action=push, args=5
data.splice(0, 2) // Action=splice, args=0,2
```

### 4. 你能实现一下基于 proxy 的响应式吗？能否监听对象属性的删除操作? 要求最终的输出如下方代码所示

```js
function makeObservable(target) {

}

let user = {}
user = makeObservable(user)

user.observe((action, key, value) => {
  console.log(`${action} key=${key} value=${value || ''}`)
})

user.name = 'John' // SET key=name value=John
console.log(user.name) // GET key=name value=John // John
delete user.name // DELETE key=name value=
```

**实现**

```js
let observeStore = new Map()
function makeObservable(target) {
  let handlerName  = Symbol('handler') // 避免循环引用
  observeStore.set(handlerName, [])

  target.observe = function (handler) {
    observeStore.get(handlerName).push(handler)
  }

  const proxyHandler = {
    get (target, property, receiver) {
      if (typeof target[property] === 'obect' && target[property] !== null) {
        return new Proxy(target[property], proxyHandler)
      }
      let success = Reflect.get(...arguments)

      if (success) {
        observeStore.get(handlerName).forEach(handler => handler('GET', property, target[property]))
      }

      return success
    },
    set (target, property, value, receiver) {
      let success = Reflect.set(...arguments)
      if (success) {
        observeStore.get(handlerName).forEach(handler => handler('GET', property, target[property]))
      }

      return success
    },
    deleteProperty(target, property) {
      let success = Reflect.set(...arguments)

      if (success) {
        observeStore.get(handlerName).forEach(handler => handler('DELETE', property, target[property]))
      }

      return success
    }
  }

  // 创建 proxy, 拦截更改
  return new Proxy(target, proxyHandler)
}

let user = {}
user = makeObservable(user)

user.observe((action, key, value) => {
  console.log(`${action} key=${key} value=${value || ''}`)
})

user.name = 'John' // SET key=name value=John
console.log(user.name) // GET key=name value=John // John
delete user.name // DELETE key=name value=
```
### 5. 你了解虚拟Dom吗，能说一下优缺点吗

对于真实DOM的抽象，用嵌套对象表示，用属性来来描述节点，最终通过一系列的操作映射到真实dom上

### 5. 给你一段数据结构，将其转为真实dom


### 6. Symbol

### 7. 具体如何让一个对象可遍历

### 8. JONS.stringify 会忽略 symbol，除了这个，还会忽略什么

undefined, function 

如果对象有循环引用,可以用 JSON.stringify 来处理吗
qus: 确定 stringify 会报错，而不是 parse 报错

### 9 实现一个深拷贝

方法一：JSON.parse(JSON.stringify(ob))

// 使用了判断数据类型
 === 
 instanceof 
 typeof 
 isArray 
 Object.prorotype.toString.call(obj) 
 constructor

实现一个instanceof
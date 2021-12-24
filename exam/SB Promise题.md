### 从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节

```js

Promise.resolve().then(() => {
    console.log(0);
    return Promise.resolve(4);
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1);
}).then(() => {
    console.log(2);
}).then(() => {
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() =>{
    console.log(6);
})
setTimeout(() => {
    console.log('set')
})

```

作者：ITEM
链接：https://juejin.cn/post/6945319439772434469
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

**提示**

需要再熟悉一下 promiseA 规范及 手写Promise
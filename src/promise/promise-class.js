// 思考：
// promise.catch 是基于 promise.then 实现的
// promise.then 方法会先创建一个新的 Promise实例，然后把状态持起

const PENDING = 'pending'
const FULLFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  FULLFILLED_CALLBACKS_LIST = []
  REJECTED_CALLBACKS_LIST = []
  _STATUS = PENDING
  constructor(fn) {
    this.status = PENDING
    this.value = ''
    this.reason = ''
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch(err) {
      this.reject(err)
    }
  }
  get status () {
    return this._STATUS
  }
  set status (newStatus) {
    this._STATUS = newStatus
    switch (newStatus) {
      case FULFILLED:
        this.FULLFILLED_CALLBACKS_LIST.forEach(callback => {
          callback(this.value)
        })
        break
      case REJECTED: 
        this.REJECTED_CALLBACKS_LIST.forEach(callback => {
          callback(this.reason)
        })
    }
  }
  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
    }
  }
  reject(reason) {
    if (this.status === REJECTED) {
      this.status = REJECTED
      this.reason = reason
    }
  }
  isFunction (param) {
    return typeof param === 'function'
  }
  then(onFullfilled, onRejected) {
    // 忽略非函数
    const realOnFullfilled = this.isFunction(onFullfilled) ? onFullfilled : val => val
    const realOnRejected = this.isFunction(onRejected) ? onRejected : reason => { throw reason }

    // then 会返回一个新的 Promise 实例
    const self = this
    const promise2 = new MyPromise((resolve, reject) => {
      // 使用 queueMicrotast 模拟微任务实现 
      const fullfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnFullfilled(self.value)
            // resolve(x)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = realOnRejected(self.reason)

            // resolve(x)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch(err) {
            reject(err)
          }
        })
      }


      switch(self.status) {
        case FULLFILLED:
          // 加入微任务队列等待执行
          // realOnFullfilled()
          fullfilledMicrotask()

          break
        case REJECTED:
          // 加入微任务队列等待执行
          // realOnRejected()
          rejectedMicrotask()
          break
        case PENDING:
          // 加入回调函数列表 
          // 1. onFullfilled 加入  FULLFILLED_CALLBACKS_LIST 
          // 2. onREJECTED 加入 REJECTED_CALLBACKS_LIST
          self.FULLFILLED_CALLBACKS_LIST.push(fullfilledMicrotask)
          self.REJECTED_CALLBACKS_LIST.push(rejectedMicrotask)
          break
      }
    })
  }
  resolvePromise(promise2, x, resolve, reject) {
    // 1. 如果 promise2 和 x 是同一个 Promise 实例, 以 TypeError 为拒因拒绝执行 promise2
    if (promise2 === x) {
      reject(new TypeError('The promise and return value are same'))
      return
    }

    if (x instanceof MyPromise) {
      // 如果 x 为 Promise 实例,则使 promise2 接受 x 的状态
      // 也就是继续执行 x, 如果执行的时候拿到一个 y, 还要继续解析 y
      queueMicrotask(() => {
        x.then(y => {
          this.resolveProimse(proimse2, y, resolve, reject)
        }, reject)
      })
    } else if ((typeof x === 'object' && x !== null) || this.isFunction(x)) {
      let then = null

      try {
        then = x.then
      } catch(error) {
        reject(error)
        return
      }

      if (this.isFunction(then)) {
        let called = false

        try {
          then.call(
            x,
            (y) => {
              if (called) return
              called = true
              this.resolvePromise(promise2, y, resolve, reject)
            },
            (r) => {
              if (called) return
              called = true
              reject(r)
            }
          )

        } catch(e) {
          if  (called) return
          called = true
          reject(r)
        }

      } else {
        resolve(x)
      }
      

    } else {
      resolve(x)
    }


  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }

    return new MyPromise(resolve => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      const length = promiseList.length

      if (length === 0) {
        return resolve()
      }

      for(let i = 0; i< length; i++) {
        MyPromise.resolve(promiseList[i]).then(
          (val) => {
            return resolve(val)
          },
          (reason) => {
            return reject(reason)
          }
        )
      }
    })
  }
}

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 1000);
// }).then(res => {
//   console.log('res', res)
// })


// const  p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('p')
//   })
// })

// p.then(res => {
//   console.log('p->res1', res)
// })

// p.then(res => {
//   console.log('p->res2', res)
// })


// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   })
// })

// p2.then(() => {
//   console.log(1)
// })
// .catch(() => {

// })
// .then(() => {

// })

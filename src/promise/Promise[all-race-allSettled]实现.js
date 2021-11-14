// Promise.all 实现
Promise.all2 = function (promiseList) {
  return new Promise((resolve, reject) => {
    const result = []
    let count = 0
    for (let i = 0; i < promiseList.length; i++) {
      promiseList[i].then(
        res => {
          result[i] = res
          count++
          if (count === promiseList.length) {
            resolve(result)
          }
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

// Promise.race 实现
Promise.race2  = function (proimseList) {
  return new Promise((resolve, reject) => {
    for(let i = 0; i < promiseList.length; i++) {
      // promiseList[i].then(
      //   (val) => {
      //     resolve(val)
      //   },
      //   (err) => {
      //     resolve(val)
      //   }
      // )
      // 使用 Promise.resolve 可以解决 promiseList 中不为 Promise 实例的问题
      Promise.resolve(promiseList[i])
        .then(
          (val) => {
            resolve(val)
          },
          (reason) => {
            resolve(reason)
          }
        )
    }
  })
}

Promise.allSettled = function (promiseList) {
  return new  Promise((resolve, reject) => {
    let count = 0
    let result = []

    for (let  i = 0; i < promiseList.length; i++) {
      Promise.resolve(promiseList[i]).then(
        (val) => {
          count++
          result[i] = {
            status: 'fullfilled',
            value: val
          }
        },
        (reason) => {
          count++
          result[i] = {
            status: 'rejected',
            reason: reason
          }
        }
      ).finally(() => {
        if (count === this.length) {
          resolve(result)
        }
      })
    }
  })
}
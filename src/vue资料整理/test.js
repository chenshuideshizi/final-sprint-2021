function instanceOf(left, right) {
    if (typeof left !== 'object' || left === null) {
      return false
    }
  
    while(true) {
      if (left === null) {
        return false
      }
  
      if (left.__proto__ === right.prototype) {
        return true
      }
      
      left = left.__proto__
    }
  }

  console.log(instanceOf([], Number))
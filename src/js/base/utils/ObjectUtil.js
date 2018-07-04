const ObjectUtil = {
  deepCopy: function (data) { // 简单的深复制，但不包括原型链上的复制
    return JSON.parse(JSON.stringify(data));
  },
  objectToArray: function (data) { // 对象转数组
    if (data instanceof Array) {
      return data;
    } else {
      if (data instanceof Object) {
        var data2 = [], i = 0;
        for (var key in data) {
          data2[i] = data[key];
          i++;
        }
        return data2;
      } else {
        return [];
      }
    }
  }
}

export default ObjectUtil

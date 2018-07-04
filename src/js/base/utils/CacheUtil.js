/**
 * Created by hb on 2017/4/11.
 */

const CacheUtil = {
  fetchFromLocal: function (key) {
    if (Storage) {
      try {
        return window.localStorage.getItem(key)
      } catch (e) {
        return null
      }
    }
  },
  saveToLocal: function (key, val) {
    if (Storage) {
      try {
        window.localStorage.setItem(key, val)
        return true
      } catch (e) {
        return false
      }
    }
  },
  removeFromLocal: function (key) {
    if (Storage) {
      try {
        window.localStorage.removeItem(key)
        return true
      } catch (e) {
        return false
      }
    }
  },
  // 从cookie取数据
  fetchFromCookie: function (name, cookieString) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let cookies = cookieString || document.cookie
    let arr = cookies.match(reg)
    if (arr !== undefined && arr != null) {
      return arr[2]
    } else {
      return null
    }
  },
  /**
   * 往cookie从存数据
   * @param key 名字
   * @param value 值
   * @param seconds 时间 秒
   */
  saveToCookie (key, value, seconds, domain) {
    let exp = new Date()
    if (seconds !== null) {
      exp.setTime(exp.getTime() + seconds * 1000)
    }

    document.cookie = key +
      '=' + encodeURIComponent(value) +
      ((seconds == null) ? '' : ';path=/;expires=' + exp.toGMTString()) +
      ((domain == null) ? '' : ';path=/;domain=' + domain)
  },
  removeFromCookie: function (key) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1000)
    let cval = this.fetchFromCookie(key)
    if (cval != null) {
      document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString()
    }
  }
}

export default CacheUtil

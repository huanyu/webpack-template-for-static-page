/**
 * Created by hb on 2016/11/25.
 */

const ScreenUtil = {
  // 计算页面滚动的位置
  getScrollY: function () {
    if (document.body.scrollTop) {
      return document.body.scrollTop
    } else {
      return document.documentElement.scrollTop
    }
  },
  // 返回页面顶部
  goPageTop: function () {
  },
  isWeChat: function () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) === 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  // 添加屏幕滚动监听
  bindScroll: function (target, handler) {
    if (target.addEventListener) {
      target.addEventListener('scroll', handler, false)
    } else if (target.attachEvent) {
      target.attachEvent('onscroll', handler)
    }
  },
  // 移除屏幕滚动监听
  unBindScroll: function (target, handler) {
    if (target.removeEventListener) {
      target.removeEventListener('scroll', handler, false)
    } else if (target.detachEvent) {
      target.detachEvent('onscroll', handler)
    }
  }

}

export default ScreenUtil

/**
 * Created by hb on 2016/12/13.
 */

const TextUtil = {
    // 时间格式化
    formatTime (second) {
        if (second <= 0) {
            return ({d: '00', h: '00', m: '00', s: '00'})
        }
        let d = Math.floor(second / (3600 * 24))
        d = d < 10 ? ('0' + d) : d
        let h = Math.floor((second - d * 3600 * 24) / 3600)
        h = h < 10 ? ('0' + h) : h
        let m = Math.floor((second - d * 3600 * 24 - h * 3600) / 60)
        m = m < 10 ? ('0' + m) : m
        let s = Math.floor(second - d * 3600 * 24 - h * 3600 - m * 60)
        s = s < 10 ? ('0' + s) : s

        return ({d: d, h: h, m: m, s: s})
    },
    // 时间初始化new Date().format("yyyy-MM-dd hh:mm:ss");
    formatDate: function (date, format) {
        if (!(date instanceof Date) && typeof (date) === 'number') {
            date = new Date().setTime(date)
        }
        let o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
            'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
            }
        }
        return format
    },
    trim (text) {
        // 清除掉收尾空格
        return text.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
    },
    isCNIdCardValid (idCard) {
        // 身份证号码是否合法
        if (idCard.length < 1) {
            return false
        }
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(idCard))) {
            return false
        }
        return true
    },
    isCNNameValid (name) {
        // 中文名是否合法
        if (name.length < 1) {
            return false
        }
        if (!(/^[\u4e00-\u9fa5]+[·]?[\u4e00-\u9fa5]+$/.test(name))) {
            return false
        }
        return true
    },
    isPhoneValid (phone) {
        // 中文名是否合法
        if (phone.length < 1) {
            return false
        }
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false
        }
        return true
    }
}

export default TextUtil

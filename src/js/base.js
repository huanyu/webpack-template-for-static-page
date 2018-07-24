/**
 * Created by hb on 2018/6/20.
 */
import '../scss/base.scss'

import {toast, alert, confirm} from './base/components/popup'
import {Tab, TabNavigator} from './base/components/tab'
import {PullRefresh} from './base/components/pullrefresh'
const Handlebars = require('handlebars/dist/handlebars.min')

const initPage = function (page) {
    if (page) {
        if (page.hasOwnProperty('components')){
            for(var i = 0; i < page.components.length; i++) {
                switch(page.components[i]) {
                    case 'toast':
                        page.toast = toast;
                        break;
                    case 'alert':
                        page.alert = alert;
                        break;
                    case 'confirm':
                        page.confirm = confirm;
                        break;
                    case 'Tab':
                        page.Tab = Tab;
                        break;
                    case 'TabNavigator':
                        page.TabNavigator = TabNavigator;
                        break;
                    case 'PullRefresh':
                        page.PullRefresh = PullRefresh;
                        break;
                    default:
                        break;
                }
            }
        }
        if (page.hasOwnProperty('templates')){
            let complied = {}
            for(var i = 0; i < page.templates.length; i++) {
                let key = page.templates[i]
                let templObj = document.getElementById(key)
                if (templObj) {
                    try {
                        complied[key] = Handlebars.compile(templObj.innerHTML)
                    } catch (e) {
                        complied[key] = null
                    }
                } else {
                    complied[key] = null
                }
            }
            page.template = complied
        }
        if (page.hasOwnProperty('mounted')){
            page.mounted()
        }
    }
}

require.ensure(['fastclick', 'jquery'], function () {
    const FastClick = require('fastclick')
    FastClick.attach(document.body)
    const $ = require('jquery')
    window.$ = $
    window.mfwInited = false

    $(function () {
        if (!window.mfwInited) {
            window.mfwInited = true
            // 如果有需要全局初始化的代码 写在这里
            if (window.__mfwPage) {
                initPage(window.__mfwPage)
            }

            if (window.mfwPage) {
                initPage(window.mfwPage)
            }
        }
    })
})

let setSize = () => {
    document.documentElement.style.fontSize = 20 * document.documentElement.clientWidth / 375 + 'px'
}
setSize()
window.addEventListener('resize', setSize, false)

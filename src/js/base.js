/**
 * Created by hb on 2018/6/20.
 */
import '../scss/base.scss'

import {toast} from './base/popup'

const $ = require('jquery')
const FastClick = require('fastclick')
FastClick.attach(document.body)

let setSize = () => {
    document.documentElement.style.fontSize = 20 * document.documentElement.clientWidth / 375 + 'px'
}
setSize()
window.addEventListener('resize', setSize, false)

window.$ = $
window.mfwInited = false

$(function () {
    if (!window.mfwInited) {
        window.mfwInited = true
        // 如果有需要全局初始化的代码 写在这里
        let page = window.mfwPage
        if (page) {
            if (page.hasOwnProperty('plugins')){
                for(var i = 0; i < page.plugins.length; i++) {
                    switch(page.plugins[i]) {
                        case 'toast':
                            page.toast = toast;
                            break;
                        case 'TabNavigator':
                            page.TabNavigator = TabNavigator;
                            break;
                        default:
                            break;
                    }
                }
            }
            if (page.hasOwnProperty('mounted')){
                page.mounted()
            }
        }
    }
})

export class Tab {
    constructor (element, listener) {
        this.calListener = listener || $(element).attr('onChange')
        this.element = $(element)
        this.element.on('click', '.tab-item', this.onTabChange.bind(this))
    }

    onTabChange (e) {
        $(e.target).addClass('on').siblings().removeClass('on')
        if (this.calListener) {
            if (typeof this.calListener === 'function') {
                this.calListener($(e.target).attr('value'))
            } else {
                try {
                    window.mfwPage[this.calListener]($(e.target).attr('value'))
                } catch (e) {
                    console.error(e)
                }
            }
        }
    }

    destruct () {
        this.element.on('click', '.tab-item', null)
        delete this.calListener
        delete this.element
    }
}

export class TabNavigator {
    constructor (element) {
        this.element = element
        this.tab = new Tab($(element).find('.tabs')[0], this.onTabChange.bind(this))
        this.tabcontent = $(element).find('.tab-content')[0]
    }

    onTabChange (index) {
        $($(this.tabcontent).find('.tab-content-item')[parseInt(index)]).addClass('on').siblings().removeClass('on')
    }

    destruct () {}
}

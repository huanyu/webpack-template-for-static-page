/**
 * Created by hb on 2018/6/20.
 */
import '../scss/base.scss'

import $ from 'jquery'

$(function () {
    let setSize = () => {
        document.documentElement.style.fontSize = 20 * document.documentElement.clientWidth / 375 + 'px'
    }
    setSize()
    window.addEventListener('resize', setSize, false)

    const FastClick = require('fastclick')
    FastClick.attach(document.body)

    $('.my-tab').on('click', '.tab-item', (e) => {
        $(e.target).addClass('on').siblings().removeClass('on')
    })

    if (window.mfwPage && window.mfwPage.hasOwnProperty('mounted')) {
        window.mfwPage.mounted()
    }
})

export class Tab {

    constructor (element) {
        this.calListener = $(element).attr('onChange')
        this.element = $(element)
        this.element.on('click', '.tab-item', this.onTabChange.bind(this))
    }

    onTabChange (e) {
        $(e.target).addClass('on').siblings().removeClass('on')
        if (this.calListener) {
            try {
                window.mfwPage[this.calListener]($(e.target).attr('value'))
            } catch (e) {
                console.error(e)
            }
        }
    }

    destruct () {
        this.element.on('click', '.tab-item', null)
        delete this.calListener
        delete this.element
    }
}

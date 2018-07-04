/**
 * Created by hb on 2018/7/4.
 */

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


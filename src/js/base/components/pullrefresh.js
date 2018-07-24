/**
 * Created by hb on 2018/7/4.
 */
const MAX_DRAG = 100 // 最大拖动距离
export class PullRefresh {
    constructor (element, loadingElement, onTrigger) {
        this.target = element
        this.loading = loadingElement
        this.onTriggerListener = onTrigger
        this.lastY = 0
        this.distance = 0
        this.activated = false
        this.onTouchStart = this._onTouchStart.bind(this)
        this.onTouchMove = this._onTouchMove.bind(this)
        this.onTouchEnd = this._onTouchEnd.bind(this)
        this.target.addEventListener('touchstart', this.onTouchStart)
    }

    start () {
        this.distance = 0
        this.target.style.cssText = `transition: transform 0.2s ease-out;transform: translateY(0px);-webkit-transform: -webkit-translateY(0px);`
        this.loading.style.cssText = `transition: height 0.2s ease-out;height:0px;`
        $(this.loading).removeClass('active')
        this.target.addEventListener('touchstart', this.onTouchStart)
    }

    _onTouchStart (e) {
        if (this.activated) {
            return
        }
        // e.preventDefault()
        this.lastY = e.touches[0].screenY
        this.target.addEventListener('touchmove', this.onTouchMove)
        this.target.addEventListener('touchend', this.onTouchEnd)
    }

    _onTouchMove (e) {
        if (this.activated) {
            return
        }
        // console.log('touchmove', e.touches[0].screenY, this.lastY)
        let isSwipeDown = (e.touches[0].screenY - this.lastY) > 0
        let isContentScrolled = this.target.scrollTop > 0
        if (isSwipeDown) {
            if (!isContentScrolled) {
                e.preventDefault()
                if (this.distance < MAX_DRAG) {
                    this.distance += (e.touches[0].screenY - this.lastY)
                    this.target.style.cssText = `transform: translateY(${this.distance}px);-webkit-transform: -webkit-translateY(${this.distance}px);`
                    this.loading.style.cssText = `height: ${this.distance}px;`
                }
            }
        } else {
            if (this.distance > 0) {
                e.preventDefault()
                this.distance += (e.touches[0].screenY - this.lastY)
                this.distance = this.distance < 0 ? 0 : this.distance
                this.target.style.cssText = `transform: translateY(${this.distance}px);-webkit-transform: -webkit-translateY(${this.distance}px);`
                this.loading.style.cssText = `height: ${this.distance}px;`
            }
        }
        this.lastY = e.touches[0].screenY
    }

    async _onTouchEnd () {
        // e.preventDefault()
        this.clearEvent()
        if (this.distance >= MAX_DRAG) {
            this.activated = true
            this.clearEvent()
            $(this.loading).addClass('active')
            if (this.onTriggerListener) {
                let r = await this.onTriggerListener()
                this.activated = false
                this.start()
            }
        } else {
            this.target.style.cssText = `transition: transform 0.2s ease-out;transform: translateY(0px);-webkit-transform: -webkit-translateY(0px);`
            this.loading.style.cssText = `transition: height 0.2s ease-out;height:0px;`
            this.distance = 0
        }
    }

    clearEvent () {
        this.target.removeEventListener('touchmove', this.onTouchMove)
        this.target.removeEventListener('touchend', this.onTouchEnd)
    }

    destruct () {
        this.clearEvent()
        this.target.removeEventListener('touchstart', this.onTouchStart)
    }
}
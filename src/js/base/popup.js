/**
 * Created by hb on 2018/6/27.
 */

/**
 *
 * @param msg
 * @param duration
 */
export function toast(msg, duration = 3000) {
    const $ = window.$
    let _popUpId = 'mfw-toast'+new Date().getTime()
    msg = String(msg)
    if(msg === null || msg === undefined){
        msg = ''
    }

    let htmlStr =
        `<div id="${_popUpId}" class="mfw-toast">
            <div class="mfw-toast-content">${msg}</div>
        </div>`
    $('body').append(htmlStr)

    setTimeout(function(){
        $(`#${_popUpId}`).remove()
    }, duration)
}

/**
 * 系统提示框
 * @param str 提示的内容
 * @param position 提示框出现的位置 默认为屏幕正中间
 * @param okLabel 确认按钮上的文字 默认为“确认”
 * @param okCallBack 点击按钮后执行的动作
 */
let alerts = []
export function alert(params) {
    const $ = window.$
    let _popUpId = 'mfw_alert'
    let p = params
    p.content = String(p.content)
    if(p.content === null || p.content === undefined){
        p.content = ''
    }
    p.title = p.title || "系统提示"
    p.okLabel = p.okLabel || "确认"
    p.okCallBack = p.okCallBack
    p.content = p.content
    p.position = p.position || 'center'

    if(document.getElementsByClassName('pop-alert').length > 0){
        alerts.push(p)
        return
    }
    var tpl =`
        <div id="${_popUpId}" class="mfw-pop ${p.position} ${p.position === 'bottom'? 'size-full': 'size-normal'} pop-alert">
        <div class="mfw-pop-wrapper">
            <div class="mfw-pop-header">
                <h3 class="head-text text-center">${p.title}</h3>
            </div>
            <div id="alert-message-con" class="mfw-pop-content">${p.content}</div>
            <div class="mfw-pop-footer">
                <div class="buttons">
                    <button id="popup-btn${_popUpId}" class="mfw-button primary size-lg">确定</button>
                </div>
            </div>
            <em id="close_${_popUpId}" class="close"></em>
        </div>
    </div>`

    $('body').append(tpl)

    let close = () => {
        if(alerts.length > 0){
            p = alerts.shift()
            $('#alert-message-con').html(p.content)
            return
        }

        if(!$('#' + _popUpId).hasClass("bottom")){
            $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-scale-out-animate')
        }else{
            $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-slide-out-animate')
        }
        setTimeout(function(){
            $('#'+_popUpId).fadeOut(200, function(){
                $('#'+_popUpId).remove()
            })
        },400)

        p = null
    }

    $('#' + _popUpId).click(function(e){
        if(e.target == this){
            close()
        }
    })

    $('#popup-btn' + _popUpId).click(function(){
        if(p.okCallBack){
            p.okCallBack()
        }
        close()
    })

    $('#close_'+ _popUpId).click(function(){
        close()
    })

    $('#'+_popUpId).fadeIn(200)
    if(p.position === 'center'){
        $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-scale-in-animate')
    } else if(p.position === 'bottom') {
        $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-slide-up-animate')
    }
}
/**
 * content 显示的提示内容
 * okCallBack 点击确认按钮时要执行的函数
 * cancelCallBack 点击取消按钮时要执行的函数
 * okLabel 确认按钮上显示的文字,可以把确认两个字换成别的文字
 * cancelLabel 取消按钮上显示的文字
 * position 在屏幕中的位置
 */
export function  confirm(params) {
    const $ = window.$
    let _popUpId = 'mfw_pop_' + new Date().getTime()
    let p = params
    p.content = String(p.content)
    if(p.content === null || p.content === undefined){
        p.content = ''
    }
    p.title = p.title || "系统提示"
    p.okLabel = p.okLabel || "确认"
    p.cancelLabel = p.cancelLabel || "取消"
    p.okLabel = p.okLabel || "确认"
    p.okCallBack = p.okCallBack
    p.cancelCallBack = p.cancelCallBack
    p.content = p.content
    p.position = p.position || 'center'


    var tpl =`
        <div id="${_popUpId}" class="mfw-pop ${p.position} ${p.position === 'bottom'? 'size-full': 'size-normal'} pop-confirm">
        <div class="mfw-pop-wrapper">
            <div class="mfw-pop-header">
                <h3 class="head-text text-center">${p.title}</h3>
            </div>
            <div id="alert-message-con" class="mfw-pop-content">${p.content}</div>
            <div class="mfw-pop-footer">
                <div class="buttons">
                    <button id="popup_btn_cancel_${_popUpId}" class="mfw-button default size-lg">取消</button>
                    <button id="popup_btn_confirm_${_popUpId}" class="mfw-button primary size-lg">确定</button>
                </div>
            </div>
            <em id="close_${_popUpId}" class="close"></em>
        </div>
    </div>`

    $('body').append(tpl)

    let close = () => {
        if (!$('#' + _popUpId).hasClass("bottom")) {
            $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-scale-out-animate')
        } else {
            $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-slide-out-animate')
        }
        setTimeout(function(){
            $('#'+_popUpId).fadeOut(200, function(){
                $('#'+_popUpId).remove()
            })
        },400)

        p = null
    }

    $('#' + _popUpId).click(function(e){
        if(e.target === this){
            close()
        }
    })

    $('#popup_btn_confirm_' + _popUpId).click(function(){
        if(p.okCallBack){
            p.okCallBack()
        }
        close()
    })

    $('#popup_btn_cancel_' + _popUpId).click(function(){
        if(p.cancelCallBack){
            p.cancelCallBack()
        }
        close()
    })

    $('#close_'+ _popUpId).click(function(){
        close()
    })

    $('#'+_popUpId).fadeIn(200)
    if(p.position === 'center'){
        $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-scale-in-animate')
    } else if(p.position === 'bottom') {
        $($('#' + _popUpId).find('.mfw-pop-wrapper')[0]).addClass('popup-slide-up-animate')
    }
}
/**
 * Created by hb on 2018/6/27.
 */

const $ = window.$
/**
 *
 * @param msg
 * @param duration
 */
export function toast(msg, duration = 3000) {
    let _popUpId = 'mfw-toast'+new Date().getTime();
    msg = String(msg);
    if(msg === null || msg === undefined){
        msg = '';
    }

    let htmlStr =
        `<div id="${_popUpId}" class="mfw-toast">
            <div class="mfw-toast-content">${msg}</div>
        </div>`
    $('body').append(htmlStr);

    setTimeout(function(){
        $(`#${_popUpId}`).remove();
    }, duration);
}

export function alert() {
}

export function  confirm() {
}
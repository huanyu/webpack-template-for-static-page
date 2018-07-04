import md5 from 'md5'
/**
 * 尝试复制文字到剪贴板
 * @param text
 * @returns {boolean}
 */
export function copyTextToClipboard (text) {
  let textArea = document.createElement('textarea')

  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0
  textArea.style.width = '2em'
  textArea.style.height = '2em'
  textArea.style.padding = 0
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'
  textArea.style.background = 'transparent'
  textArea.value = text

  document.body.appendChild(textArea)

  textArea.select()
  let result = document.execCommand('copy')
  document.body.removeChild(textArea)
  return result
}

export function getSign (object, privateKey) {
  object.privateKey = privateKey
  let tmp = []
  for (let key in object) {
    tmp.push(key)
  }
  tmp.sort()
  let str = `${tmp[0]}=${object[tmp[0]]}`
  for (let i = 1; i < tmp.length; i++) {
    str += `${tmp[i]}=${object[tmp[i]]}`
  }
  console.log(str)
  return md5(str)
}

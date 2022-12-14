type fastUploadType = {
  /**
   * 是否支持多选(默认支持)
   */
  multiple: boolean
  /**
   * 上传默认支持类型(默认全部支持)
   */
  accept: string | null
}

let defaultFastUpload = {
  multiple: true,
  accept: null,
}

export default function fastUpload(params: fastUploadType = defaultFastUpload): Promise<any> {
  return new Promise((resolve, reject) => {
    if (document.readyState != 'complete') {
      throw new Error('dom loading exception, please ensure that the dom is fully loaded before using')
    }
    let fileCancle = true // 当前input是否未上传了文件

    let { input } = createInput({
      multiple: params.multiple,
      accept: params.accept,
    })

    // 取消上传文件
    // input 没有自带cancel事件,所以监听获得焦点事件(上传文件框被拉起后,无论是直接返回,点击取消,点击确认都会触发该事件)
    // 因为全局监听事件与input onchange callback 没有关联,所以采用异步方案
    window.addEventListener(
      'focus',
      () => {
        setTimeout(() => {
          if (fileCancle) {
            removeInput(input)
            reject('upload canceled')
          }
        }, 500)
      },
      { once: true }
    )

    // 上传了文件
    input.onchange = (evt) => {
      fileCancle = false
      removeInput(input)
      let { files } = evt.target as HTMLInputElement
      return resolve(params.multiple ? files : files![0])
    }
  })
}

/**
 * 创建上传用input
 * @returns
 */
function createInput({ multiple, accept }: { multiple: boolean; accept: string | null }) {
  // 创建dom
  let body = document.body
  let input = document.createElement('input')
  input.type = 'file'
  input.style.position = 'absolute'
  input.style.top = '0'
  input.style.opacity = '0'
  input.style.zIndex = '-9999'
  input.multiple = multiple
  if (accept) {
    input.accept = accept
  }
  // 自动点击事件
  var evt = document.createEvent('MouseEvents')
  evt.initEvent('click', true, true)
  input.dispatchEvent(evt)
  body.appendChild(input)
  return {
    input,
  }
}

/**
 * 删除上传用input
 */
function removeInput(input: HTMLInputElement) {
  var parent = input.parentElement
  parent!.removeChild(input)
}

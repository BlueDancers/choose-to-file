const chooseToFile = (params = {
    multiple: true,
    accept: null,
}) => {
    return new Promise((resolve, reject) => {
        if (document.readyState != 'complete') {
            throw new Error('dom loading exception, please ensure that the dom is fully loaded before using');
        }
        let fileCancle = true; // 是否未上传文件
        let { input } = createInput({
            multiple: params.multiple,
            accept: params.accept,
        });
        // TODO  { once: true }
        window.addEventListener('focus', focusCallback);
        /**
         * 上传callback
         */
        input.onchange = (evt) => {
            fileCancle = false;
            let { files } = evt.target;
            return resolve(params.multiple ? files : files[0]);
        };
        /**
         * 未上传
         */
        function focusCallback() {
            setTimeout(() => {
                if (fileCancle) {
                    window.removeEventListener('focus', focusCallback);
                    reject('upload canceled');
                }
            }, 500);
        }
    });
};
export { chooseToFile };
/**
 * 创建上传用input
 * @returns
 */
function createInput({ multiple, accept }) {
    // 创建dom
    let input = document.createElement('input');
    input.type = 'file';
    input.style.position = 'absolute';
    input.style.top = '0';
    input.style.opacity = '0';
    input.style.zIndex = '-9999';
    input.multiple = multiple;
    if (accept) {
        input.accept = accept;
    }
    // 自动点击
    input.click();
    return {
        input,
    };
}

# choose-to-file

## 介绍

​	通过函数直接拉起上传文件能力，使用方法与微信小程序的上传图片API`wx.chooseMedia`类似，更加编写，解耦合的在H5端实现上传文件功能。

​	采用ts进行编写，具有良好的代码提示，支持web环境所有框架（Vue2、Vue3、React）



## 基本用法

### 安装

```bash
npm i choose-to-file
```

### 使用示例

```js
import { chooseToFile } from 'choose-to-file'

async function uploadImg() {
	try {
		let res = await chooseToFile()
		console.log('file' + res)
	} catch (err) {
		console.log(err)
	}
}
```



## API

| 属性     | 类型    | 默认值 | 说明                                     |
| -------- | ------- | ------ | ---------------------------------------- |
| multiple | boolean | true   | 是否上传多张图片，暂时不支持具体数量校验 |
| accept   | string  | Null   | 上传文件类型校验，默认不做校验           |



## 注：

当multiple为true时，API的返回值为Array类型的File对象

当multiple为false时，API的返回值为File对象


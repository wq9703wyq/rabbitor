# rabbit-editor

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
<<<<<<< HEAD
```

## 介绍

本项目是为Vue项目而设计的富文本编辑器框架,提供以下功能：

1）字体颜色、字体背景颜色、字号大小、字体、加粗、斜体、下划线、删除线、无序列表、有序列表、文本对齐、缩进等Word常用文体编辑功能

2）插入链接


3）插入表格

4）插入图片以及图片拉伸

5）代码段以及高亮显示

## GitHub项目地址

>$$$$$$$$$$$$$$$$$

## 实例化
```javascript
<div>
<rabbitEditor></rabbitEditor>
</div>
```

编辑器的宽高为父元素的宽高100%

## Api

#### 获取编辑器的html文本

```javascript
Vue.prototype.$getEditHtml = function () {
    return document.getElementById('editormain').innerHTML
  }
```

已注册在Vue的原型链中，需要使用时：
```javascript
return this.$getEditHtml()
```


#### 给编辑器设置内容

```javascript
<rabbitEditor :innerHtml="内容"></rabbitEditor>
```

=======
```

## 介绍

本项目是为Vue项目而设计的富文本编辑器框架,提供以下功能：

1）字体颜色、字体背景颜色、字号大小、字体、加粗、斜体、下划线、删除线、无序列表、有序列表、文本对齐、缩进等Word常用文体编辑功能

2）插入链接


3）插入表格

4）插入图片以及图片拉伸

5）代码段以及高亮显示

## GitHub项目须知

> gitHub 上只上传了作者的代码，使用者clone了项目后需要安装highlight.js,font-awesome插件以及其他基本依赖

## npm

```bash
npm i rabbitor -S 
```

## 实例化
```javascript
<div>
<rabbitEditor></rabbitEditor>
</div>
```

编辑器的宽高为父元素的宽高百分比

## Api

#### 获取编辑器的html文本

```javascript
Vue.prototype.$getEditHtml = function () {
    return document.getElementById('editormain').innerHTML
  }
```

已注册在Vue的原型链中，需要使用时：
```javascript
return this.$getEditHtml()
```


#### 给编辑器设置内容

```javascript
<rabbitEditor :innerHtml="内容"></rabbitEditor>
```

>>>>>>> c51b37a5ba6ff6758c7e53c20816105241c88a53
# 版本更新

- 1.0.0   初次上传npm失败，原因未对项目打包

- 1.0.1   对项目打包后重新上传，发现多处BUG：
  - 错误显示字体过长的名称，影响工具栏排版
  - 当插入代码段、引用段是会因为编辑器子元素缺失问题而插入失败

- 1.0.2~~1.0.3  修复了1.0.1的问题

- 1.0.4  上传使用文档

<<<<<<< HEAD
- 1.0.5  修改bug
    - 点击编辑区域后无法在其他可输入区域进行输入
    - 响应式设计改为以编辑器的宽度为标准


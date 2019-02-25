import rabbitEditor from './plugin/editor.vue'
import colorOptions from './components/colorOptions'
import quote from './components/quote'
import hyperlink from './components/hyperlink'
import linkSet from './components/linkSet'
import table from './components/table'
import tableSet from './components/tableSet'
import codeArea from './components/codeArea'
import imgEdit from './components/imgEdit'
import moreTools from './components/moreTools'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import 'font-awesome/css/font-awesome.min.css'
import './plugin/compoentsCss.css'
const install = (Vue, globalOptions) => {
  if (globalOptions) {
    rabbitEditor.props.globalOptions.default = () => globalOptions
  }
  function showQuote (innerHtml) {
    const Quote = Vue.extend(quote)
    let vm = new Quote({
      el: document.createElement('div'),
      data () {
        return {
          innerHtml: innerHtml
        }
      }
    })
    // document.getElementById('editormain').insertBefore(vm.$el, nextNode)
    return vm.$el
  }
  function showLink (linkName, link) {
    const Hyperlink = Vue.extend(hyperlink)
    let vm = new Hyperlink({
      el: document.createElement('div'),
      data () {
        return {
          link: link,
          linkName: linkName
        }
      }
    })
    return vm
  }
  function showTable (row, col) {
    const Table = Vue.extend(table)
    let vm = new Table({
      el: document.createElement('div'),
      data () {
        return {
          row: row,
          col: col
        }
      }
    })
    return vm.$el
  }
  function showCode (code) {
    const CodeArea = Vue.extend(codeArea)
    let vm = new CodeArea({
      el: document.createElement('div'),
      data () {
        return {
          code: code,
          codeLight: cookCode(code)
        }
      }
    })
    return vm.$el
  }
  function lightCode (text) {
    return hljs.highlightAuto(text).value
  }
  function styleSet () {
    const CodeArea = Vue.extend(codeArea)
    let vm = new CodeArea()
    return vm.styleSet
  }
  function cookCode (code) {
    let classArray = []
    let blockResult = []
    let templeDiv = document.createElement('div')
    templeDiv.innerHTML = hljs.highlightAuto(code).value
    codeArea.methods.domTreeGet(templeDiv.childNodes[0], classArray, blockResult)
    let innerHtml = []
    for (let i in blockResult) {
      innerHtml.push(blockResult[i].outerHTML)
    }
    return innerHtml.join('')
  }
  function showImg (src) {
    const ImgEdit = Vue.extend(imgEdit)
    let vm = new ImgEdit({
      el: document.createElement('div'),
      data () {
        return {
          startX: 0,
          startY: 0,
          width: 300,
          end: false,
          src: src
        }
      }
    })
    return vm.$el
  }
  Vue.prototype.$showQuote = showQuote
  Vue.prototype.$showLink = showLink
  Vue.prototype.$showTable = showTable
  Vue.prototype.$showCode = showCode
  Vue.prototype.$lightCode = lightCode
  Vue.prototype.$showImg = showImg
  Vue.prototype.$cookCode = cookCode
  Vue.prototype.$styleSet = styleSet()
  Vue.prototype.$getEditHtml = function () {
    return document.getElementById('editormain').innerHTML
  }
  Vue.component(rabbitEditor.name, rabbitEditor)
  Vue.component(colorOptions.name, colorOptions)
  Vue.component(linkSet.name, linkSet)
  Vue.component(tableSet.name, tableSet)
  Vue.component(moreTools.name, moreTools)
}

const VueRabbitEditor = { rabbitEditor, install }

export default VueRabbitEditor

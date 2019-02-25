<template>
  <div class="codeZone" id="codeZone" contentEditable="true" onpaste="return false">
    <pre class="codeArea" v-html="codeLight"><br></pre>
  </div>
</template>

<script>
export default {
  name: 'codearea',
  data () {
    return {
      code: '',
      codeLight: ''
    }
  },
  mounted: function () {
  },
  methods: {
    // test4: function (e) {
    //   // var KEY_CODE = [32, 8, 13, 37, 38, 40, 39]
    //   // if (KEY_CODE.indexOf(e.keyCode) !== -1) {
    //   //   return false
    //   // }
    //   let selection = window.getSelection()
    //   let range = selection.getRangeAt(0)
    //   let nowNode = range.commonAncestorContainer
    //   let blockResult = []
    //   let startOff = range.startOffset
    //   let newStart = 0 // 新光标所在子节点下标
    //   this.test5()
    //   while (nowNode.parentNode.className !== 'core') {
    //     nowNode = nowNode.parentNode
    //   }
    //   let textArray = nowNode.parentNode.textContent.split(/[\s]/)
    //   for (let i = 0; i < textArray.length; i++) {
    //     let temple = this.$lightCode(textArray[i])
    //     blockResult.push(temple)
    //   }
    //   for (let i = 0; i < blockResult.length; i++) {
    //     let templeDiv = document.createElement('DIV')
    //     templeDiv.innerHTML = blockResult[i]
    //     if (templeDiv.childNodes.length > 1) {
    //       let templeText = templeDiv.innerText
    //       let classResult = []
    //       for (let j = 0; j < templeDiv.childNodes.length; j++) {
    //         let templeNode = templeDiv.childNodes[j]
    //         while (templeNode) {
    //           classResult.push(templeNode.className)
    //           templeNode = templeNode.childNodes[0]
    //         }
    //       }
    //       let templeClass = classResult.join(' ')
    //       blockResult[i] = "<span class='" + templeClass + "'>" + templeText + '</span>'
    //     }
    //     if (blockResult[i].indexOf('span') === -1) {
    //       blockResult[i] = '<span>' + blockResult[i] + '</span>'
    //     }
    //   }
    //   console.log(blockResult)
    //   while (nowNode.previousSibling !== null) {
    //     nowNode = nowNode.previousSibling
    //     if (nowNode.nodeType !== 3) {
    //       startOff += textArray[newStart].length
    //       newStart++
    //     } else if (nowNode.nodeType === 3) {
    //       startOff++
    //     }
    //   }
    //   newStart = 0
    //   for (let i = 0; i < blockResult.length; i++) {
    //     let templeDiv = document.createElement('DIV')
    //     templeDiv.innerHTML = blockResult[i]
    //     startOff = i > 0 ? startOff - 1 : startOff // 减去空格
    //     if ((startOff - templeDiv.innerText.length) > 0) {
    //       startOff -= templeDiv.innerText.length
    //     } else {
    //       newStart = i
    //       break
    //     }
    //   }
    //   newStart = newStart > 0 ? newStart + newStart : newStart
    //   let parentNode = nowNode.parentNode
    //   parentNode.innerHTML = blockResult.join(' ')
    //   let minNode = parentNode.childNodes[newStart]
    //   while (minNode.childNodes.length !== 0) {
    //     minNode = minNode.childNodes[0]
    //   }
    //   range.setStart(minNode, startOff)
    //   range.setEnd(minNode, startOff)
    // },
    styleSet: function (e) {
      var KEY_CODE = [13, 37, 38, 40, 39, 17]
      if (KEY_CODE.indexOf(e.keyCode) !== -1) {
        return false
      }
      let selection = window.getSelection()
      let range = selection.getRangeAt(0)
      let startOff = range.startOffset
      let nowNode = range.commonAncestorContainer
      // 避免报错
      if (nowNode.nodeType !== 3) {
        return false
      }
      let blockResult = [] // 加工后的节点
      let newStart = 0 // 新光标所在子节点下标
      // 从文本节点回到本层div的第一行节点
      while (nowNode.parentNode.className !== 'codeArea') {
        nowNode = nowNode.parentNode
      }
      let classArray = []
      let templeDiv = document.createElement('div')
      templeDiv.innerHTML = this.$lightCode(nowNode.parentNode.textContent)
      this.domTreeGet(templeDiv.childNodes[0], classArray, blockResult)
      // 计算光标在父节点文本中的位置startOff
      while (nowNode.previousSibling !== null) {
        nowNode = nowNode.previousSibling
        startOff += nowNode.parentNode.childNodes[newStart].textContent.length
        newStart++
      }
      newStart = 0
      // 根据startOff计算出光标在第几个节点中
      for (let i = 0; i < blockResult.length; i++) {
        let templeDiv = blockResult[i]
        if ((startOff - templeDiv.innerText.length) > 0) {
          startOff -= templeDiv.innerText.length
        } else {
          newStart = i
          break
        }
      }
      let parentNode = nowNode.parentNode
      let innerHtml = []
      for (let i in blockResult) {
        innerHtml.push(blockResult[i].outerHTML)
      }
      parentNode.innerHTML = innerHtml.join('')
      let minNode = parentNode.childNodes[newStart]
      while (minNode.childNodes.length !== 0) {
        minNode = minNode.childNodes[0]
      }
      range.setStart(minNode, startOff)
      range.setEnd(minNode, startOff)
    },
    domTreeGet: function (node, classArray, result) {
      if (node.className) {
        classArray.push(node.className)
      }
      if (node.childNodes.length > 0) {
        this.domTreeGet(node.childNodes[0], classArray, result)
      } else {
        let templeSpan = document.createElement('span')
        templeSpan.innerHTML = node.textContent
        if (classArray.length > 0) {
          templeSpan.setAttribute('class', classArray.join(' '))
        }
        result.push(templeSpan)
      }
      if (node.nextSibling) {
        if (node.className) {
          classArray.pop()
        }
        this.domTreeGet(node.nextSibling, classArray, result)
      }
    }
  }
}
</script>

<style scoped>
.codeZone {
  outline: none;
}
.codeArea {
  width: 98%;
  margin: 0 auto;
  padding: 3px;
  font-size: 14px;
  font-weight: 500;
  background: #f7f7f7;
  font-family: Consolas;
}
.codeArea:before {
  content:counter(my);
  font-size: 13px;
  color: #ababab;
  margin-right: 10px;
}
.codeArea {
  counter-increment:my;
}
</style>

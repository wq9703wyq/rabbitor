<!--suppress ALL -->
<template>
  <div id="editor">
    <div class="toolbar">
      <div class="titlesize"
           @click="limitArea ? titleBool = !titleBool : ''"
           ref="titlesize"
           :class="{editbutton: limitArea, forbidButton: !limitArea}"
           title="标题">
        <span>{{titleSize}}</span>
        <i class="fa fa-angle-down"></i>
        <div class="titleoptions" v-show="titleBool === true">
          <h1 class="titleoption" @click="editorEntrance('formatBlock','H1')">标题1</h1>
          <h2 class="titleoption" @click="editorEntrance('formatBlock','H2')">标题2</h2>
          <h3 class="titleoption" @click="editorEntrance('formatBlock','H3')">标题3</h3>
          <h4 class="titleoption" @click="editorEntrance('formatBlock','H4')">标题4</h4>
          <h5 class="titleoption" @click="editorEntrance('formatBlock','H5')">标题5</h5>
          <h6 class="titleoption" @click="editorEntrance('formatBlock','H6')">标题6</h6>
          <div class="titleoption" @click="editorEntrance('formatBlock','P')">普通文本</div>
        </div>
      </div>
      <span class="separator separatorOne"></span>
      <div class="wordcolor" title="字体颜色">
        <i class="fa fa-font"
           :style="{color: wordColor}"
           :class="{editbutton: forbidArea, forbidButton: !forbidArea}"
           @click="forbidArea ? wordColorSet(wordColor) : ''">
        </i>
        <i class="fa fa-angle-down"
           @click="forbidArea ? wordcolorBool = !wordcolorBool : ''"
           :class="{editbutton: forbidArea, forbidButton: !forbidArea}"
           ref="wordcolor">
        </i>
        <color-options
          :colorArea="COLOR_AREA"
          :colorTarget.sync="wordColor"
          :defaultColor="'#000'"
          v-show="wordcolorBool">
        </color-options>
      </div>
      <div class="wordbackground" title="字体背景颜色">
        <i class="fa fa-font"
           :style="{background: wordBackground}"
           :class="{editbutton: forbidArea, forbidButton: !forbidArea}"
           @click="forbidArea ? wordBackgroundSet(wordBackground) : ''"></i>
        <i class="fa fa-angle-down"
           @click="forbidArea ? wordBackgroundBool = !wordBackgroundBool : ''"
           :class="{editbutton: forbidArea, forbidButton: !forbidArea}"
           ref="wordbackground"></i>
        <color-options
          :colorArea="COLOR_AREA"
          :colorTarget.sync="wordBackground"
          :defaultColor="'#fff'"
          v-show="wordBackgroundBool">
        </color-options>
      </div>
      <div class="wordsize"
           @click="forbidArea ? wordSizeBool = !wordSizeBool : ''"
           ref="wordsize"
           :class="{editbutton: forbidArea, forbidButton: !forbidArea}"
           title="字号">
        <span>{{wordSize}}</span>
        <i class="fa fa-angle-down"></i>
        <div class="wordsizeoptions" v-show="wordSizeBool">
          <div class="wordsizeoption"
               v-for="(item, index) in WORD_SIZE"
               :key="index"
               @click="editorEntrance('fontSize', index + 1);wordSize = item">
            {{item}}
          </div>
        </div>
      </div>
      <div class="wordname"
           @click="forbidArea ? wordNameBool = !wordNameBool : ''"
           ref="wordname"
           :class="{editbutton: forbidArea, forbidButton: !forbidArea}"
           title="字体">
        <span>{{wordName}}</span>
        <i class="fa fa-angle-down"></i>
        <div class="wordnameoptions" v-show="wordNameBool">
          <div class="wordnameoption"
               v-for="item in WORD_NAME"
               :key="item"
               @click="editorEntrance('fontName', item);wordName = item">
            {{item}}
          </div>
        </div>
      </div>
      <span class="separator separatorTwo">|</span>
      <div class="worldbold"
           :class="{selectButton: textStatus.bold, editbutton: forbidArea, forbidButton: !forbidArea}"
           title="加粗"
           @click="forbidArea ? editorEntrance('wordBold') : ''">
        <i class="fa fa-bold"></i>
      </div>
      <div class="italics"
           :class="{selectButton: textStatus.italic, editbutton: forbidArea, forbidButton: !forbidArea}"
           title="斜体"
           @click="forbidArea ? editorEntrance('italics') : ''">
        <i class="fa fa-italic"></i>
      </div>
      <div class="underline"
           :class="{selectButton: textStatus.underline, editbutton: forbidArea, forbidButton: !forbidArea}"
           title="下划线"
           @click="forbidArea ? editorEntrance('underline') : ''">
        <i class="fa fa-underline"></i>
      </div>
      <div class="strikeThrough"
           :class="{selectButton: textStatus.strike, editbutton: forbidArea, forbidButton: !forbidArea}"
           title="删除线"
           @click="forbidArea ? editorEntrance('strikeThrough') : ''">
        <i class="fa fa-strikethrough"></i>
      </div>
      <span class="separator separatorThree">|</span>
      <div class="imageinsert"
           :class="{editbutton: limitArea, forbidButton: !limitArea}"
           @click="limitArea ? clickSimulated() : ''"
           title="插入图片">
        <i class="fa fa-file-image-o" type="file"></i>
        <input type="file"
               id="filepath"
               @change="picUpload(this)"
               accept="image/jpg,image/jpeg,image/png,image/PNG">
      </div>
      <div class="codearea"
           :class="{selectButton: textStatus.class === 'codeZone',editbutton: codeLimit('codeZone'),
           forbidButton: !codeLimit('codeZone')}"
           title="代码段"
           @click="codeLimit('codeZone') ? codeAreaSet() : ''">
        <i class="fa fa-file-code-o"></i>
      </div>
      <div class="unorderedlist"
           :class="{selectButton: textStatus.ul,editbutton: limitArea, forbidButton: !limitArea}"
           title="无序列表"
           @click="limitArea ? editorEntrance('insertUnorderedList') : ''">
        <i class="fa fa-list"></i>
      </div>
      <div class="orderedlist"
           :class="{selectButton: textStatus.ol,editbutton: limitArea, forbidButton: !limitArea}"
           title="有序列表"
           @click="limitArea ? editorEntrance('insertOrderedListSet') : ''">
        <i class="fa fa-list-ol"></i>
      </div>
      <span class="separator separatorFour">|</span>
      <div class="alignment"
           :class="{editbutton: limitArea, forbidButton: !limitArea}"
           @click="limitArea ? (alignmentBool = !alignmentBool) : ''"
           ref="alignment"
           title="文本对齐">
        <i class="fa fa-align-left" v-show="alignment === 'left'"></i>
        <i class="fa fa-align-center" v-show="alignment === 'center'"></i>
        <i class="fa fa-align-right" v-show="alignment === 'right'"></i>
        <i class="fa fa-angle-down"></i>
        <div class="alignmentoptions" v-show="alignmentBool === true">
          <div class="alignmentoption"
               @click="limitArea ? editorEntrance('justifyLeft') : ''">
            <i class="fa fa-align-left"></i>
            <span>左对齐</span>
          </div>
          <div class="alignmentoption"
               @click="limitArea ? editorEntrance('justifyCenter') : ''">
            <i class="fa fa-align-center"></i>
            <span>居中对齐</span>
          </div>
          <div class="alignmentoption"
               style="border-bottom: none"
               @click="limitArea ? editorEntrance('justifyRight') : ''">
            <i class="fa fa-align-right"></i>
            <span>右对齐</span>
          </div>
        </div>
      </div>
      <div class="indent"
           :class="{editbutton: limitArea, forbidButton: !limitArea}"
           title="缩进"
           @click="limitArea ? editorEntrance('indent') : ''">
        <i class="fa fa-indent"></i>
      </div>
      <div class="outdent"
           :class="{editbutton: limitArea, forbidButton: !limitArea}"
           title="减少缩进"
           @click="limitArea ? editorEntrance('outdent') : ''">
        <i class="fa fa-outdent"></i>
      </div>
      <span class="separator separatorFive">|</span>
      <div class="paragraph"
           :class="{selectButton: textStatus.class === 'quoteView',editbutton: codeLimit('quoteView'),
           forbidButton: !codeLimit('quoteView')}"
           @click="codeLimit('quoteView') ? paragraphSet() : ''"
           title="引用">
        <i class="fa fa-quote-left"></i>
      </div>
      <div class="link"
           title="链接"
           ref="link"
           @click="forbidArea && !textStatus.a ? linkBool = !linkBool : ''"
           :class="{editbutton: !textStatus.a && forbidArea,
           forbidButton: textStatus.a || !forbidArea}">
        <i class="fa fa-chain"></i>
        <linkset :linkName.sync="linkName"
                 :hyperlink.sync="hyperlink"
                 v-show="linkBool"
                 @click.native="stopPropagation">
        </linkset>
      </div>
      <div class="form"
           title="表格"
           ref="form"
           @click="limitArea ? tableBool = !textStatus.table : ''"
           :class="{editbutton: limitArea,
           forbidButton: !limitArea}">
        <i class="fa fa-table"></i>
        <tableset
          :row.sync="row"
          :col.sync="col"
          v-show="tableBool"
          @click.native="stopPropagation">
        </tableset>
      </div>
      <div class="horizontalrule"
           :class="{editbutton: limitArea && !textStatus.a, forbidButton: !limitArea || textStatus.a}"
           title="分割线"
           @click="limitArea && !textStatus.a ? editorEntrance('insertHorizontalRule') : ''">
        <i class="fa fa-window-minimize"></i>
      </div>
      <div class="moretools editbutton" title="更多" @click="toolBool = !toolBool" ref="moretools">
        <span>更多</span>
        <i class="fa fa-angle-down"></i>
        <div class="moreTools" v-if="toolBool" @click="stopPropagation">
          <!--分割线-->
          <div class="horizontalrule"
               :class="{editbutton: limitArea && !textStatus.a, forbidButton: !limitArea || textStatus.a}"
               title="分割线"
               @click="limitArea && !textStatus.a ? editorEntrance('insertHorizontalRule') : ''">
            <i class="fa fa-window-minimize"></i>
          </div>
          <!--表格-->
          <div class="form"
               title="表格"
               ref="form"
               @click="limitArea ? tableBool = !textStatus.table : ''"
               :class="{editbutton: limitArea,forbidButton: !limitArea}">
            <i class="fa fa-table"></i>
            <tableset :row.sync="row" :col.sync="col" v-show="tableBool" @click.native="stopPropagation"></tableset>
          </div>
          <!--链接-->
          <div class="link"
               title="链接"
               ref="link"
               @click="forbidArea && !textStatus.a ? linkBool = !linkBool : ''"
               :class="{editbutton: !textStatus.a && forbidArea,
           forbidButton: textStatus.a || !forbidArea}">
            <i class="fa fa-chain"></i>
            <linkset :linkName.sync="linkName"
                     :hyperlink.sync="hyperlink"
                     v-show="linkBool"
                     @click.native="stopPropagation">
            </linkset>
          </div>
          <!--引用-->
          <div class="paragraph"
               :class="{selectButton: textStatus.class === 'quoteView',editbutton: codeLimit('quoteView'),
           forbidButton: !codeLimit('quoteView')}"
               @click="codeLimit('quoteView') ? paragraphSet() : ''"
               title="引用">
            <i class="fa fa-quote-left"></i>
          </div>
          <!--减少缩进-->
          <div class="outdent"
               :class="{editbutton: limitArea, forbidButton: !limitArea}"
               title="减少缩进"
               @click="limitArea ? editorEntrance('outdent') : ''">
            <i class="fa fa-outdent"></i>
          </div>
          <!--缩进-->
          <div class="indent"
               :class="{editbutton: limitArea, forbidButton: !limitArea}"
               title="缩进"
               @click="limitArea ? editorEntrance('indent') : ''">
            <i class="fa fa-indent"></i>
          </div>
          <!--文本排序-->
          <div class="alignment"
               :class="{editbutton: limitArea, forbidButton: !limitArea}"
               @click="limitArea ? (alignmentBool = !alignmentBool) : ''"
               ref="alignment"
               title="文本对齐">
            <i class="fa fa-align-left" v-show="alignment === 'left'"></i>
            <i class="fa fa-align-center" v-show="alignment === 'center'"></i>
            <i class="fa fa-align-right" v-show="alignment === 'right'"></i>
            <i class="fa fa-angle-down"></i>
            <div class="alignmentoptions" v-show="alignmentBool === true">
              <div class="alignmentoption"
                   @click="limitArea ? editorEntrance('justifyLeft') : ''">
                <i class="fa fa-align-left"></i>
                <span>左对齐</span>
              </div>
              <div class="alignmentoption"
                   @click="limitArea ? editorEntrance('justifyCenter') : ''">
                <i class="fa fa-align-center"></i>
                <span>居中对齐</span>
              </div>
              <div class="alignmentoption"
                   style="border-bottom: none"
                   @click="limitArea ? editorEntrance('justifyRight') : ''">
                <i class="fa fa-align-right"></i>
                <span>右对齐</span>
              </div>
            </div>
          </div>
          <!--有序列表-->
          <div class="orderedlist"
               :class="{selectButton: textStatus.ol,editbutton: limitArea, forbidButton: !limitArea}"
               title="有序列表"
               @click="limitArea ? editorEntrance('insertOrderedListSet') : ''">
            <i class="fa fa-list-ol"></i>
          </div>
          <!--无序列表-->
          <div class="unorderedlist"
               :class="{selectButton: textStatus.ul,editbutton: limitArea, forbidButton: !limitArea}"
               title="无序列表"
               @click="limitArea ? editorEntrance('insertUnorderedList') : ''">
            <i class="fa fa-list"></i>
          </div>
          <!--代码段-->
          <div class="codearea"
               :class="{selectButton: textStatus.class === 'codeZone',editbutton: codeLimit('codeZone'),
           forbidButton: !codeLimit('codeZone')}"
               title="代码段"
               @click="codeLimit('codeZone') ? codeAreaSet() : ''">
            <i class="fa fa-file-code-o"></i>
          </div>
          <!--插入图片-->
          <div class="imageinsert"
               :class="{editbutton: limitArea, forbidButton: !limitArea}"
               @click="limitArea ? clickSimulated() : ''"
               title="插入图片">
            <i class="fa fa-file-image-o" type="file"></i>
            <input type="file"
                   id="filepath"
                   @change="picUpload(this)"
                   accept="image/jpg,image/jpeg,image/png,image/PNG">
          </div>
          <!--删除线-->
          <div class="strikeThrough"
               :class="{selectButton: textStatus.strike, editbutton: forbidArea, forbidButton: !forbidArea}"
               title="删除线"
               @click="forbidArea ? editorEntrance('strikeThrough') : ''">
            <i class="fa fa-strikethrough"></i>
          </div>
          <!--下划线-->
          <div class="underline"
               :class="{selectButton: textStatus.underline, editbutton: forbidArea, forbidButton: !forbidArea}"
               title="下划线"
               @click="forbidArea ? editorEntrance('underline') : ''">
            <i class="fa fa-underline"></i>
          </div>
          <!--斜体-->
          <div class="italics"
               :class="{selectButton: textStatus.italic, editbutton: forbidArea, forbidButton: !forbidArea}"
               title="斜体"
               @click="forbidArea ? editorEntrance('italics') : ''">
            <i class="fa fa-italic"></i>
          </div>
          <!--加粗-->
          <div class="worldbold"
               :class="{selectButton: textStatus.bold, editbutton: forbidArea, forbidButton: !forbidArea}"
               title="加粗"
               @click="forbidArea ? editorEntrance('wordBold') : ''">
            <i class="fa fa-bold"></i>
          </div>
        </div>
      </div>
    </div>
    <div contentEditable="true"
         class="editormain"
         id="editormain"
         spellcheck="false"
         @paste="pastionChange"
         onpaste="return false"
         @keydown.tab="tabListen"
         @keydown="keyDownEdit"
         @blur="rangeSelect"
         @keyup="keyUpEdit"
         @mouseup="mouseUpEdit"
         @keypress="keyPressEdit"
         v-html="innerHtml"
         ref="editormain">
    </div>
  </div>
</template>

<script>
export default {
  name: 'rabbitEditor',
  data () {
    return {
      range: null, // 光标选择的区域
      rangeBool: true, // 另蓝拖固定功能失效
      titleBool: false, // 标题大小开关
      titleSize: '普通文本', // 标题大小
      wordSizeBool: false, // 字体大小开关
      wordSize: '16px', // 字体大小
      wordNameBool: false, // 字体类开关
      wordName: '微软雅黑', // 字体类
      alignmentBool: false, // 文本对齐开关
      alignment: 'left', // 文本对齐
      wordcolorBool: false, // 文字颜色开关
      wordColor: '', // 文字颜色
      wordBackgroundBool: false, // 文字背景颜色开关
      wordBackground: '', // 文字背景颜色
      linkBool: false, // 链接开关
      hyperlink: '', // 超链接地址
      linkName: '', // 超链接名称
      tableBool: false, // 表格开关
      row: 0, // 表格横数
      col: 0, // 表格列数
      toolBool: false, // 更多工具开关
      COLOR_AREA: [
        {colorRow: [
          {color: '#f2f2f2'},
          {color: '#808080'},
          {color: '#ddd9c2'},
          {color: '#c5d9f2'},
          {color: '#dce6f3'},
          {color: '#f3dcdb'},
          {color: '#ebf1dd'},
          {color: '#e6e0ec'},
          {color: '#daeef4'},
          {color: '#feead9'}]
        },
        {colorRow: [
          {color: '#d9d9d9'},
          {color: '#595959'},
          {color: '#c4be95'},
          {color: '#8db3e5'},
          {color: '#b8cde6'},
          {color: '#e7b9b7'},
          {color: '#d7e5bb'},
          {color: '#ccc0db'},
          {color: '#b6dee9'},
          {color: '#fdd5b3'}]
        },
        {colorRow: [
          {color: '#bfbfbf'},
          {color: '#404040'},
          {color: '#948b50'},
          {color: '#528cd8'},
          {color: '#94b2d9'},
          {color: '#da9693'},
          {color: '#c3d798'},
          {color: '#b3a1c8'},
          {color: '#91cdde'},
          {color: '#fbc08c'}]
        },
        {colorRow: [
          {color: '#a6a6a6'},
          {color: '#262626'},
          {color: '#4a4528'},
          {color: '#15365f'},
          {color: '#355f94'},
          {color: '#973632'},
          {color: '#769436'},
          {color: '#60487c'},
          {color: '#2c859d'},
          {color: '#e66c00'}]
        },
        {colorRow: [
          {color: '#808080'},
          {color: '#0d0d0d'},
          {color: '#1e1c10'},
          {color: '#0f2340'},
          {color: '#243f62'},
          {color: '#642422'},
          {color: '#4f6324'},
          {color: '#403053'},
          {color: '#1e5969'},
          {color: '#994800'}]
        }
      ], // 可选颜色
      WORD_SIZE: ['10px', '13px', '16px', '18px', '24px', '32px'], // 可选字号
      WORD_NAME: ['微软雅黑', '宋体', '仿宋', '新宋体', '楷体', '黑体', 'Arial'], // 可选字体
      IMMEDIATE_EDIT: [
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'indent',
        'outdent',
        'insertOrderedListSet',
        'insertUnorderedList',
        'insertHorizontalRule'
      ],
      LIMIT_AREA: ['quoteView', 'codeZone', 'tableOut'],
      FORBID_AREA: ['codeZone'],
      standOrder: {
        orderList: [],
        valueList: []
      }, // 保存文本编辑指令
      textStatus: {
        italic: false,
        underline: false,
        bold: false,
        strike: false,
        ol: false,
        ul: false,
        class: '',
        br: ''
      } // 光标所在文本的样式
    }
  },
  props: {
    innerHtml: {
      types: String,
      default: '<div><br></div>'
    }
  },
  computed: {
    limitArea: function () {
      let vm = this
      return (vm.LIMIT_AREA.indexOf(vm.textStatus.class) === -1)
    },
    forbidArea: function () {
      let vm = this
      return (vm.FORBID_AREA.indexOf(vm.textStatus.class) === -1)
    }
  },
  watch: {
    wordColor: function (value) {
      var vm = this
      vm.editorEntrance('foreColor', value)
    },
    wordBackground: function (value) {
      var vm = this
      vm.editorEntrance('hiliteColor', value)
    },
    hyperlink: function () {
      let vm = this
      vm.linkSet(vm.linkName, vm.hyperlink)
      vm.linkBool = false
    },
    linkBool: function (value) {
      let vm = this
      if (vm.textStatus.a) {
        vm.linkBool = false
        return false
      }
      this.rangeBool = !value
    },
    row: function () {
      this.formSet()
    }
  },
  mounted: function () {
    this.ready()
  },
  methods: {
    ready: function () {
      var vm = this
      // 为每个超链接添加点击事件
      var hyperlinks = document.getElementsByClassName('hyperlink')
      if (hyperlinks.length) {
        for (let i = 0; i < hyperlinks.length; i++) {
          hyperlinks[i].addEventListener('click', (e) => {
            window.open(hyperlinks[i].attributes.href.textContent)
          })
        }
      }
      var imgs = document.getElementsByClassName('imgs')
      if (imgs.length) {
        for (let i in imgs) {
          let src = imgs[i].attributes.src
          let imgView = vm.$showImg(src)
          let parentNode = imgs[i].parentNode
          parentNode.replaceChild(imgView, imgs[i])
        }
      }
      // 点击按钮以外的地方关闭列表
      document.addEventListener('click', (e) => {
        if (!vm.$refs.titlesize.contains(e.target)) {
          vm.titleBool = false
        }
        if (!vm.$refs.wordsize.contains(e.target)) {
          vm.wordSizeBool = false
        }
        if (!vm.$refs.wordname.contains(e.target)) {
          vm.wordNameBool = false
        }
        if (!vm.$refs.alignment.contains(e.target)) {
          vm.alignmentBool = false
        }
        if (!vm.$refs.wordcolor.contains(e.target)) {
          vm.wordcolorBool = false
        }
        if (!vm.$refs.wordbackground.contains(e.target)) {
          vm.wordBackgroundBool = false
        }
        if (!vm.$refs.link.contains(e.target)) {
          vm.linkBool = false
        }
        if (!vm.$refs.form.contains(e.target)) {
          vm.tableBool = false
        }
        if (!vm.$refs.moretools.contains(e.target)) {
          vm.toolBool = false
        }
      })
    },
    keyPressEdit: function (e) {
      let vm = this
      if (e.keyCode !== 13) {
        return false
      }
      if (vm.textStatus.class.indexOf('quoteView') !== -1) {
        if (vm.textStatus.br) {
          var range = window.getSelection().getRangeAt(0)
          let tempELe = range.commonAncestorContainer
          while (tempELe.className !== 'quoteView') {
            tempELe = tempELe.parentNode
          }
          var nextNode = tempELe.nextSibling
          if (!nextNode || !nextNode.innerHTML) {
            tempELe.outerHTML = '<div><br></div>'
          }
        }
      }
    },
    // 点击编辑框获取样式
    mouseUpEdit: function (e) {
      let vm = this
      try {
        vm.textStyleGet()
      } catch (e) {
        return false
      }
    },
    // 获取光标附近样式 代码高亮设置
    keyUpEdit: function (e) {
      let vm = this
      // 按下快捷键时执行相应命令后return false防止后续操作清空命令
      if (e.ctrlKey || e.keyCode === 17) {
        return false
      }
      if (vm.FORBID_AREA.indexOf(vm.textStatus.class) !== -1) {
        vm.$styleSet(e)
      }
      try {
        vm.textStyleGet()
      } catch (e) {
        return false
      }
    },
    // 键盘按下事件---执行保存的编辑指令
    keyDownEdit: function (e) {
      let vm = this
      if (e.ctrlKey || e.keyCode === 17) {
        vm.keyGroupListen(e)
        return false
      }
      if (!vm.standOrder.orderList || vm.FORBID_AREA.indexOf(vm.textStatus.class) !== -1) {
        return false
      }
      vm.orderExcute()
    },
    // 使用部分功能限制其他功能
    codeLimit: function (self) {
      let vm = this
      let index = vm.LIMIT_AREA.indexOf(self)
      let limit = vm.LIMIT_AREA.slice()
      limit.splice(index, 1)
      return (limit.indexOf(vm.textStatus.class) === -1)
    },
    // 替换新的range
    rangeSelect: function () {
      var vm = this
      var selection = window.getSelection()
      vm.range = null
      vm.range = selection.getRangeAt(0).cloneRange()
      if (vm.rangeBool) {
        selection.removeAllRanges()
        selection.addRange(vm.range)
      }
    },
    // 保存编辑指令
    orderSave: function (order, value) {
      var vm = this
      var index
      if ((index = vm.standOrder.orderList.indexOf(order)) > -1) {
        // 指令为值类型则替换值
        if (value) {
          vm.standOrder.orderList[index] = order
          vm.standOrder.valueList[index] = value
        } else { // 指令为布尔类型则删除指令
          vm.standOrder.orderList.splice(index, 1)
          vm.standOrder.valueList.splice(index, 1)
        }
      } else {
        vm.standOrder.orderList.push(order)
        vm.standOrder.valueList.push(value)
      }
    },
    // 指令执行
    orderExcute: function () {
      var vm = this
      for (let i in vm.standOrder.orderList) {
        switch (vm.standOrder.orderList[i]) {
          case 'formatBlock':
            vm.titleSizeSet(vm.standOrder.valueList[i])
            break
          case 'foreColor':
            vm.wordColorSet(vm.standOrder.valueList[i])
            break
          case 'hiliteColor':
            vm.wordBackgroundSet(vm.standOrder.valueList[i])
            break
          case 'fontSize':
            vm.fontSizeSet(vm.standOrder.valueList[i])
            break
          case 'fontName':
            vm.fontNameSet(vm.standOrder.valueList[i])
            break
          case 'wordBold':
            vm.wordBoldSet()
            break
          case 'italics':
            vm.italicsSet()
            break
          case 'underline':
            vm.underlineSet()
            break
          case 'strikeThrough':
            vm.strikeThroughSet()
            break
          case 'insertUnorderedList':
            vm.unorderedListSet()
            break
          case 'insertOrderedListSet':
            vm.orderedListSet()
            break
          case 'justifyLeft':
            vm.justifyLeftSet()
            break
          case 'justifyRight':
            vm.justifyRightSet()
            break
          case 'justifyCenter':
            vm.justifyCenterSet()
            break
          case 'indent':
            vm.indentSet()
            break
          case 'outdent':
            vm.outdentSet()
            break
          case 'insertHorizontalRule':
            vm.horizontalRuleSet()
            break
        }
      }
      vm.standOrder.orderList.splice(0, vm.standOrder.orderList.length)
      vm.standOrder.valueList.splice(0, vm.standOrder.valueList.length)
    },
    // 文本样式检查
    textStyleGet: function () {
      var vm = this
      var selection = window.getSelection()
      var range = selection.getRangeAt(0)
      var aimEle = range.commonAncestorContainer
      var tempEle = null
      var TAGS = ['U', 'I', 'B', 'STRIKE', 'OL', 'UL', 'BR', 'A', 'TABLE']
      var result = []
      if (aimEle.nodeType === 3) {
        aimEle = aimEle.parentNode
      }
      tempEle = aimEle
      while (tempEle.nodeName.indexOf('DIV') === -1) {
        if (TAGS.indexOf(tempEle.nodeName) !== -1) {
          result.push(tempEle.nodeName)
        }
        tempEle = tempEle.parentNode
      }
      vm.textStatus = {
        italic: result.indexOf('I') !== -1,
        underline: result.indexOf('U') !== -1,
        bold: result.indexOf('B') !== -1,
        strike: result.indexOf('STRIKE') !== -1,
        ol: result.indexOf('OL') !== -1,
        ul: result.indexOf('UL') !== -1,
        br: tempEle.lastChild.nodeName.indexOf('BR') !== -1, // 判断该行是否只有换行符
        a: result.indexOf('A') !== -1,
        table: result.indexOf('TABLE') !== -1,
        class: result.indexOf('TABLE') !== -1 ? 'tableOut' : tempEle.className
      }
      if (vm.textStatus.class !== 'codeZone') {
        let styles = window.getComputedStyle(aimEle, null)
        vm.wordSize = styles['fontSize']
        // vm.wordColor = styles['color']
        // vm.wordBackground = styles['background-color']
        vm.wordName = vm.WORD_NAME.indexOf(styles['font-family']) !== -1 ? styles['font-family'] : vm.wordName
        vm.alignment = styles['text-align']
      }
    },
    // 函数入口
    editorEntrance: function (order, value) {
      var vm = this
      var range
      if (!vm.range) {
        vm.$refs.editormain.focus()
      }
      vm.orderSave(order, value)
      // 部分指令按钮改变样式
      switch (order) {
        case 'wordBold':
          vm.textStatus.bold = !vm.textStatus.bold
          break
        case 'italics':
          vm.textStatus.italic = !vm.textStatus.italic
          break
        case 'underline':
          vm.textStatus.underline = !vm.textStatus.underline
          break
        case 'strikeThrough':
          vm.textStatus.strike = !vm.textStatus.strike
          break
      }
      // 部分命令直接执行
      if (vm.IMMEDIATE_EDIT.indexOf(order) !== -1) {
        vm.orderExcute()
      }
      range = window.getSelection().getRangeAt(0)
      // 蓝拖选中区域直接执行命令
      if (!range.collapsed) {
        vm.orderExcute()
        range = window.getSelection().getRangeAt(0)
        let textEle = range.commonAncestorContainer
        range.setStart(range.startContainer, textEle.length)
        range.setEnd(range.endContainer, textEle.length)
      }
    },
    // 标题大小
    titleSizeSet: function (value) {
      var vm = this
      document.execCommand('formatBlock', false, value)
      switch (value) {
        case 'H1':
          vm.titleSize = '标题1'
          break
        case 'H2':
          vm.titleSize = '标题2'
          break
        case 'H3':
          vm.titleSize = '标题3'
          break
        case 'H4':
          vm.titleSize = '标题4'
          break
        case 'H5':
          vm.titleSize = '标题5'
          break
        case 'H6':
          vm.titleSize = '标题6'
          break
        case 'P':
          vm.titleSize = '普通文本'
          break
      }
    },
    // 文字颜色
    wordColorSet: function (value) {
      document.execCommand('foreColor', false, value)
    },
    // 文字背景颜色
    wordBackgroundSet: function (value) {
      document.execCommand('hiliteColor', false, value)
    },
    // 文字加粗
    wordBoldSet: function () {
      document.execCommand('bold', false, null)
    },
    // 文字斜体
    italicsSet: function () {
      document.execCommand('italic', false, null)
    },
    // 下划线
    underlineSet: function () {
      document.execCommand('underline', false, null)
    },
    // 删除线
    strikeThroughSet: function () {
      document.execCommand('strikeThrough', false, null)
    },
    // 代码区域
    codeAreaSet: function () {
      var vm = this
      if (!vm.range) {
        vm.$refs.editormain.focus()
        vm.range = window.getSelection().getRangeAt(0)
      }
      if (vm.textStatus.class !== 'codeZone') {
        let tempEle = vm.range.commonAncestorContainer
        if (!document.getElementById('editormain').childNodes.length) {
          document.execCommand('insertHTML', false, '<div><br></div>')
          tempEle = tempEle.firstChild
        }
        while (tempEle.parentNode.className !== 'editormain') {
          tempEle = tempEle.parentNode
        }
        let code = tempEle.innerText
        setTimeout(() => {
          let codeView = vm.$showCode(code)
          let div = document.createElement('div')
          div.innerHTML = '<br>'
          let parentNode = tempEle.parentNode
          parentNode.replaceChild(div, tempEle)
          parentNode.insertBefore(codeView, div)
          let range = document.createRange()
          range.setStart(codeView, codeView.childNodes.length)
          range.setEnd(codeView, codeView.childNodes.length)
          window.getSelection().removeAllRanges()
          window.getSelection().addRange(range)
          vm.textStatus.class = 'codeZone'
        }, 0)
      } else {
        let selection = window.getSelection()
        let range = selection.getRangeAt(0)
        let spanArray = []
        let nowNode = range.commonAncestorContainer
        while (nowNode.className !== 'codeZone') {
          nowNode = nowNode.parentNode
        }
        for (let i = 0; i < nowNode.childNodes.length; i++) {
          let span = document.createElement('span')
          span.innerText = nowNode.childNodes[i].innerText
          span.className = 'preSpan'
          spanArray.push(span.outerHTML)
        }
        let div = document.createElement('div')
        div.innerHTML = spanArray.join('<br>')
        vm.$refs.editormain.replaceChild(div, nowNode)
        range.setStart(div.nextSibling, div.nextSibling.childNodes.length)
        range.setEnd(div.nextSibling, div.nextSibling.childNodes.length)
        vm.textStyleGet()
      }
    },
    // 无序列表
    unorderedListSet: function () {
      var vm = this
      vm.textStatus.ul = !vm.textStatus.ul
      vm.textStatus.ol = false
      document.execCommand('insertUnorderedList', false, null)
    },
    // 有序列表
    orderedListSet: function () {
      var vm = this
      vm.textStatus.ol = !vm.textStatus.ol
      vm.textStatus.ul = false
      document.execCommand('insertOrderedList', false, null)
    },
    // 左对齐
    justifyLeftSet: function () {
      this.alignment = 'left'
      document.execCommand('justifyLeft', false, null)
    },
    // 右对齐
    justifyRightSet: function () {
      this.alignment = 'right'
      document.execCommand('justifyRight', false, null)
    },
    // 居中
    justifyCenterSet: function () {
      this.alignment = 'center'
      document.execCommand('justifyCenter', false, null)
    },
    // 增加缩进
    indentSet: function () {
      document.execCommand('indent', false, null)
    },
    // 减少缩进
    outdentSet: function () {
      document.execCommand('outdent', false, null)
    },
    // 引用段落
    paragraphSet: function () {
      var vm = this
      if (!vm.range) {
        vm.$refs.editormain.focus()
        vm.range = window.getSelection().getRangeAt(0)
      }
      if (vm.textStatus.class !== 'quoteView') {
        let tempEle = vm.range.commonAncestorContainer
        if (!document.getElementById('editormain').childNodes.length) {
          document.execCommand('insertHTML', false, '<div><br></div>')
          tempEle = tempEle.firstChild
        }
        while (tempEle.parentNode.className !== 'editormain') {
          tempEle = tempEle.parentNode
        }
        let newNode = tempEle.innerHTML
        setTimeout(() => {
          let parentNode = tempEle.parentNode
          let quoteView = vm.$showQuote(newNode)
          parentNode.replaceChild(quoteView, tempEle)
          let range = document.createRange()
          range.setStart(quoteView, quoteView.childNodes.length)
          range.setEnd(quoteView, quoteView.childNodes.length)
          window.getSelection().removeAllRanges()
          window.getSelection().addRange(range)
          vm.textStyleGet()
        }, 0)
      } else {
        document.execCommand('formatBlock', false, 'P')
        document.execCommand('formatBlock', false, 'DIV')
        vm.textStyleGet()
      }
    },
    // 链接
    linkSet: function (linkName, link) {
      var vm = this
      if (!vm.range) {
        vm.$refs.editormain.focus()
        vm.range = window.getSelection().getRangeAt(0)
      }
      var selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(vm.range)
      let linkView = vm.$showLink(linkName, link)
      document.execCommand('insertHTML', false, linkView.$el.outerHTML)
      vm.range = window.getSelection().getRangeAt(0)
      let tempEle = vm.range.commonAncestorContainer
      while (tempEle.nodeName !== 'A') {
        tempEle = tempEle.parentNode
      }
      tempEle.addEventListener('click', (e) => {
        linkView.openLink(link)
      })
      vm.textStyleGet()
    },
    // 表格
    formSet: function () {
      var vm = this
      if (!vm.range) {
        vm.$refs.editormain.focus()
        vm.range = window.getSelection().getRangeAt(0)
      }
      let tablView = vm.$showTable(vm.row, vm.col)
      document.execCommand('insertHTML', false, tablView.outerHTML)
      vm.textStyleGet()
      vm.tableBool = false
    },
    // 分割线
    horizontalRuleSet: function () {
      document.execCommand('insertHorizontalRule', false, null)
    },
    // 字号大小
    fontSizeSet: function (value) {
      document.execCommand('fontSize', false, value)
    },
    // 字体
    fontNameSet: function (value) {
      document.execCommand('fontName', false, value)
    },
    // 特定区域粘贴处理
    pastionChange: function (e) {
      let vm = this
      let pasteText = e.clipboardData.getData('text/plain')
      if (pasteText) {
        let textArray = pasteText.split('\n')
        if (vm.textStatus.class !== 'codeZone') {
          document.execCommand('insertHTML', false, textArray.join('<br>'))
          return false
        } else {
          let codeArray = []
          let selection = window.getSelection()
          let range = selection.getRangeAt(0)
          let startOff = range.startOffset
          let nowNode = range.commonAncestorContainer
          if (nowNode.className === 'codeZone') {
            nowNode = nowNode.childNodes[0]
          } else {
            while (nowNode.parentNode.className !== 'codeArea' && nowNode.className !== 'codeArea') {
              nowNode = nowNode.parentNode
            }
          }
          while (nowNode.previousSibling !== null) {
            nowNode = nowNode.previousSibling
            startOff += nowNode.innerText.length
          }
          let frontText = nowNode.parentNode.textContent.slice(0, startOff)
          let behindText = nowNode.parentNode.textContent.slice(startOff)
          textArray[0] = frontText.concat(textArray[0])
          textArray[textArray.length - 1] = textArray[textArray.length - 1].concat(behindText)
          for (let i in textArray) {
            textArray[i] = textArray[i].replace('\n', '')
            let pre = document.createElement('pre')
            pre.className = 'codeArea'
            pre.innerHTML = vm.$cookCode(textArray[i])
            codeArray.push(pre.outerHTML)
          }
          while (nowNode.className && nowNode.className !== 'codeArea') {
            nowNode = nowNode.childNodes[0]
          }
          if (nowNode.className !== 'codeArea') {
            while (nowNode.className !== 'codeArea') {
              nowNode = nowNode.parentNode
            }
          }
          nowNode.outerHTML = codeArray.join('')
          // let selection = window.getSelection()
          // let range = selection.getRangeAt(0)
          // let nowNode = range.commonAncestorContainer
          // if (nowNode.nodeType !== 3) {
          //   while (nowNode.className && nowNode.className !== 'codeArea') {
          //     nowNode = nowNode.childNodes[0]
          //   }
          //   if (nowNode.className !== 'codeArea') {
          //     while (nowNode.className !== 'codeArea') {
          //       nowNode = nowNode.parentNode
          //       console.log(nowNode)
          //     }
          //   }
          //   nowNode.outerHTML = codeArray.join('')
          // } else {
          //   document.execCommand('insertHTML', false, codeArray.join(''))
          // }
        }
      }
    },
    tabListen: function (e) {
      if (e && e.preventDefault) {
        e.preventDefault()
      } else {
        window.event.returnValue = false
      }
      if (e.keyCode === 9) {
        document.execCommand('insertHTML', false, '&nbsp;&nbsp;')
      }
    },
    // 快捷键监听
    keyGroupListen: function (e) {
      let vm = this
      if (e.ctrlKey) {
        switch (e.keyCode) {
          case 66: // ctrl + b加粗
            vm.textStatus.bold = !vm.textStatus.bold
            break
          case 73: // ctrl + i斜体
            vm.textStatus.italic = !vm.textStatus.italic
            break
          case 85: // ctrl + u下划线
            vm.textStatus.underline = !vm.textStatus.underline
            break
          case 89: // ctrl + y删除线
            vm.editorEntrance('strikeThrough')
            break
          case 81: // ctrl + q字体颜色
            vm.wordColorSet(vm.wordColor)
            break
        }
      }
    },
    // 图片上传模拟点击
    clickSimulated: function () {
      var filePath = document.getElementById('filepath')
      filePath.click()
    },
    // 图片上传
    picUpload: function () {
      var vm = this
      if (!vm.range) {
        vm.$refs.editormain.focus()
        vm.range = window.getSelection().getRangeAt(0)
      }
      let tempEle = vm.range.commonAncestorContainer
      while (tempEle.parentNode.className !== 'editormain') {
        tempEle = tempEle.parentNode
      }
      let file = document.getElementById('filepath')
      let src = window.URL.createObjectURL(file.files[0])
      let imgView = vm.$showImg(src)
      let parentNode = tempEle.parentNode
      parentNode.insertBefore(imgView, tempEle.nextSibling)
      // document.execCommand('insertHTML', false, imgView)
      // console.log(document.execCommand('enableAbsolutePositionEditor', true, true))
    },
    stopPropagation: function (e) {
      e.stopPropagation()
    }
  }
}
</script>

<style scoped>
  #editor {
    width: 100%;
    height: 100%;
    font-family: 'Microsoft YaHei';
    text-align: left;
  }
  font {
    font-size: 9px;
  }
  .toolbar {
    width: 100%;
    height: 8%;
    display: flex;
    border-bottom: 1px solid #d3d3d3;
    align-items: center;
    font-size: 13px;
    box-sizing: border-box;
  }
  .toolbar > div {
    margin: 0 4px;
    padding: 5px;
  }
  .titlesize, .wordname {
    width: 75px;
    display: flex;
    justify-content: space-between;
  }
  .separator {
    color: #d6d4d4;
    font-size: 18px;
  }
  .forbidButton {
    color: #d8d8d8!important;
  }
  .editbutton {
    color: #484848;
    background: #fff;
    transition: .2s;
    cursor: pointer;
  }
  .editbutton:hover {
    background: #f3f3f3;
  }
  .selectButton {
    background: #e1e1e1;
  }
  .wordcolor .fa, .wordbackground .fa {
    padding: 5px;
  }
  .titlesize, .wordsize, .wordname, .alignment, .wordcolor, .wordbackground, .link, .form, .moretools {
    position: relative;
  }
  .titleoptions, .wordsizeoptions, .wordnameoptions, .alignmentoptions {
    position: absolute;
    top: 100%;
    border: 1px solid #d6d4d4;
    background: #fff;
    box-shadow: 0 0 10px #d6d4d4;
  }
  .titleoptions > div {
    border: none;
  }
  .titleoption, .wordsizeoption, .wordnameoption, .alignmentoption {
    width: 100px;
    height: 30px;
    margin: 0;
    padding: 5px;
    line-height: 30px;
    border-bottom: 1px solid #d6d4d4;
    text-align: center;
    transition: .2s;
    cursor: pointer;
  }
  .titleoption:hover, .wordsizeoption:hover, .wordnameoption:hover, .alignmentoption:hover {
    background: #f3f3f3;
  }
  .editormain {
    width: 100%;
    height: 92%;
    padding: 20px;
    box-sizing: border-box;
    outline: none;
    cursor: text;
    overflow-y: auto;
  }
  .editormain::-webkit-scrollbar {/*滚动条整体样式*/
    height: 8px;
    width: 8px;
    background: transparent;
    border-radius: 4px;
  }
  .editormain::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    width: 8px;
    min-height: 15px;
    background: #c1c1c1;
    border-radius: 4px;
  }
  .editormain::-webkit-scrollbar-track {/*滚动条里面轨道*/
    background-color: transparent;
  }
  .imageinsert {
    position: relative;
    overflow: hidden;
  }
  #filepath {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    z-index: -3;
  }
  .moretools {
    display: none;
  }
  .moreTools {
    width: 200px;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    top: 100%;
    right: 0;
    border: 1px solid #d6d4d4;
    background: #fff;
    box-shadow: 0 0 10px #d6d4d4;
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .moreTools > div {
    padding: 5px;
    margin-right: 5px;
    display: none;
  }
  @media screen and (max-width: 940px) {
    .horizontalrule {
      display: none;
    }
    .moreTools > .horizontalrule {
      display: block;
    }
    .form {
      display: none;
    }
    .moreTools > .form {
      display: block;
    }
    .moretools {
      display: block;
    }
  }
  @media screen and (max-width: 870px) {
    .link {
      display: none;
    }
    .moreTools > .link {
      display: block;
    }
  }
  @media screen and (max-width: 840px) {
    .paragraph, .separatorFive  {
      display: none;
    }
  }
  @media screen and (max-width: 800px) {
    .outdent {
      display: none;
    }
    .moreTools > .outdent {
      display: block;
    }
  }
  @media screen and (max-width: 780px) {
    .indent {
      display: none;
    }
    .moreTools > .indent {
      display: block;
    }
  }
  @media screen and (max-width: 760px) {
    .alignment, .separatorFour {
      display: none;
    }
  }
  @media screen and (max-width: 720px) {
    .orderedlist {
      display: none;
    }
    .moreTools > .orderedlist {
      display: block;
    }
  }
  @media screen and (max-width: 680px) {
    .unorderedlist {
      display: none;
    }
    .moreTools > .unorderedlist {
      display: block;
    }
  }
  @media screen and (max-width: 660px) {
    .codearea {
      display: none;
    }
    .moreTools > .codearea {
      display: block;
    }
  }
  @media screen and (max-width: 640px) {
    .imageinsert {
      display: none;
    }
    .moreTools > .imageinsert {
      display: block;
    }
  }
  @media screen and (max-width: 620px) {
    .strikeThrough, .separatorThree {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    .underline {
      display: none;
    }
    .moreTools > .underline {
      display: block;
    }
  }
  @media screen and (max-width: 580px) {
    .italics {
      display: none;
    }
    .moreTools > .italics {
      display: block;
    }
  }
  @media screen and (max-width: 560px) {
    .worldbold {
      display: none;
    }
    .moreTools > .worldbold {
      display: block;
    }
  }
  @media screen and (max-width: 450px) {
    #editor {
      width: 450px;
    }
  }
</style>
<style>
  .preSpan {
    white-space: pre-wrap
  }
</style>

<template>
    <div class="imgEdit" contenteditable="false" @click="show = true">
      <img :src="src" :style="{width: width + 'px'}" ondragstart="return false" class="imgs">
      <div class="leftTop moveBlock" @mousedown="beginPosition" v-show="show"></div>
      <div class="leftBot moveBlock" @mousedown="beginPosition" v-show="show"></div>
      <div class="rightTop moveBlock" @mousedown="beginPosition" v-show="show"></div>
      <div class="rightBot moveBlock" @mousedown="beginPosition" v-show="show"></div>
    </div>
</template>

<script>
export default {
  name: 'imgedit',
  data () {
    return {
      startX: 0,
      startY: 0,
      width: 300,
      show: false,
      src: ''
    }
  },
  methods: {
    beginPosition: function () {
      let vm = this
      vm.startX = window.event.screenX
      vm.startY = window.event.screenY
      let movePosition = vm.movePosition
      let upPosition = vm.upPosition
      window.addEventListener('mousemove', movePosition)
      window.addEventListener('mouseup', upPosition)
    },
    movePosition: function () {
      let vm = this
      let moveX = window.event.screenX - vm.startX
      let moveY = window.event.screenY - vm.startY
      vm.startX = window.event.screenX
      vm.startY = window.event.screenY
      let width = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY
      if (vm.width > 100 || width > 0) {
        vm.width = vm.width + width
      }
    },
    upPosition: function () {
      let vm = this
      let movePosition = vm.movePosition
      let upPosition = vm.upPosition
      vm.show = false
      window.removeEventListener('mousemove', movePosition)
      window.removeEventListener('mouseup', upPosition)
    }
  }
}
</script>

<style scoped>
  .imgEdit {
    moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
    width: auto;
    height: auto;
    display: inline-block;
    position: relative;
  }
  .moveBlock {
    position: absolute;
    background: #70bfff;
    width: 8px;
    height: 8px;
    z-index: 1;
  }
  .leftTop {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }
  .leftBot {
    left: -5px;
    bottom: -2px;
    cursor: ne-resize;
  }
  .rightTop {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }
  .rightBot {
    right: -5px;
    bottom: -2px;
    cursor: nw-resize;
  }
</style>

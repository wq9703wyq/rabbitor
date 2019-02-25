<template>
  <div class="colorOptions">
    <div class="optionHead" style="border-bottom: 1px solid #d6d4d4">
      <div class="headColor" @click="colorTargetCom = defaultColor" :style="{background: defaultColor}"></div>
      <span>默认颜色</span>
    </div>
    <div class="optionContent" style="flex-wrap: wrap">
      <span style="margin-bottom: 10px">可选颜色</span>
      <div class="colorArea">
        <div class="colorRow" v-for="item in colorArea" :key="item.index">
          <div class="colorBlock"
               v-for="colorBlock in item.colorRow"
               :style="{background: colorBlock.color}"
               :key="colorBlock.index"
               :value="colorBlock.color"
               @click="colorTargetCom = colorBlock.color">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'color-options',
  props: {
    colorArea: {
      type: Array,
      default: null
    },
    colorTarget: {
      type: String,
      default: null
    },
    defaultColor: {
      type: String,
      default: '#000'
    }
  },
  computed: {
    colorTargetCom: {
      get: function () {
        return this.colorTarget
      },
      set: function (value) {
        this.$emit('update:colorTarget', value)
      }
    }
  }
}
</script>

<style scoped>
  .colorOptions {
    position: absolute;
    top: 100%;
    border: 1px solid #d6d4d4;
    background: #fff;
    box-shadow: 0 0 10px #d6d4d4;
  }
  .optionHead, .optionContent {
    width: 200px;
    padding: 10px;
    color: #484848;
    display: flex;
  }
  .headColor {
    height: 20px;
    width: 20px;
    margin-right: 10px;
    cursor: pointer;
    transition: .3s;
    box-shadow: 0 0 10px #a4a8ac;
  }
  .headColor:hover {
    box-shadow: 0 0 10px #528cd8;
  }
  .colorRow {
    width: 200px;
    display: flex;
    justify-content: space-around;
  }
  .colorBlock {
    width: 15px;
    height: 15px;
    cursor: pointer;
    transition: .3s;
    transform: translate(0);
  }
  .colorBlock:hover {
    transform: translate(2px, -2px);
  }
</style>

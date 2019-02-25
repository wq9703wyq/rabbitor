<template>
  <div class="linkset">
    <div class="hyperlinkSet">
      <label>链接</label>
      <input type="text" v-model="hyperlinkReal" :placeholder="tipLink">
    </div>
    <div class="linkNameSet">
      <label>名称</label>
      <input type="text" v-model="linkNameReal" :placeholder="tipName">
    </div>
    <span class="confirm" @click="confirm">确定</span>
  </div>
</template>

<script>
export default {
  name: 'linkset',
  props: {
    hyperlink: {
      type: String,
      default: ''
    },
    linkName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      hyperlinkReal: '',
      linkNameReal: '',
      tipName: '',
      tipLink: ''
    }
  },
  methods: {
    confirm: function () {
      let vm = this
      if (!vm.hyperlinkReal || !vm.linkNameReal) {
        vm.tipName = !vm.linkNameReal ? '请填写链接名称' : ''
        vm.tipLink = !vm.hyperlinkReal ? '请填写链接名称' : ''
        return false
      }
      vm.$emit('update:hyperlink', vm.hyperlinkReal)
      vm.$emit('update:linkName', vm.linkNameReal)
    }
  }
}
</script>

<style scoped>
  .linkset {
    width: 300px;
    padding: 20px;
    top: 120%;
    right: 0;
    border: 1px solid #d6d4d4;
    background: #fff;
    box-shadow: 0 0 10px #d6d4d4;
    position: absolute;
    cursor: default;
  }
  .hyperlinkSet, .linkNameSet {
    color: #aeacac;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .hyperlinkSet input, .linkNameSet input {
    color: #8f8d8d;
    width: 230px;
    padding: 5px 10px;
    outline: none;
    border: 1px solid #aeacac;
    border-radius: 3px;
  }
  .confirm {
    padding: 5px 10px;
    color: #fff;
    background: #5faeff;
    border-radius: 3px;
    float: right;
    cursor: pointer;
  }
</style>

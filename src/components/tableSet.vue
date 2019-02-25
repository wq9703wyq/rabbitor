<template>
  <div id="tableset" @mouseleave="select(0, 0)">
    <div class="tableRow"
         v-for="r in rowStart"
         :key="r">
      <div class="tableCol"
           v-for="c in colStart"
           :key="c"
           :class="{selectTd: (c <= colSelect) && (r <= rowSelect)}"
           @click="confirm"
           @mouseover="select(c, r)">
      </div>
    </div>
    <span>{{rowSelect}}行{{colSelect}}列</span>
  </div>
</template>

<script>
export default {
  name: 'tableset',
  props: {
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      rowStart: 10,
      colStart: 8,
      rowSelect: 0,
      colSelect: 0
    }
  },
  methods: {
    select: function (col, row) {
      this.rowSelect = row
      this.colSelect = col
    },
    confirm: function () {
      let vm = this
      vm.$emit('update:row', vm.rowSelect)
      vm.$emit('update:col', vm.colSelect)
    }
  }
}
</script>

<style scoped>
 #tableset {
   position: absolute;
   top: 120%;
   right: 0;
   padding: 20px;
   height: 220px;
   display: flex;
   flex-wrap: wrap;
   align-content:space-between;
   justify-content: center;
   border: 1px solid #d6d4d4;
   background: #fff;
   box-shadow: 0 0 10px #d6d4d4;
 }
  .tableRow {
    width: 150px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tableCol {
    width: 15px;
    height: 15px;
    background: #fbf9f9;
    border: 1px solid #cbcbcb;
    border-radius: 2px;
  }
  .selectTd {
    background: #acbcec;
  }
</style>

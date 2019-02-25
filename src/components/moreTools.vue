<template>
  <div class="moretools">
    <div class="horizontalrule editbutton"
         title="分割线">
      <i class="fa fa-window-minimize"></i>
    </div>
    <div class="form editbutton"
         title="表格"
         ref="form"
         :class="{editbutton: limitArea,
           forbidButton: !limitArea}">
      <i class="fa fa-table"></i>
      <tableset :row.sync="row" :col.sync="col" v-show="tableBool"></tableset>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moretools'
}
</script>

<style scoped>
.moretools {
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
  justify-content: space-around;
  flex-wrap: wrap;
}
.moretools > div {
  padding: 5px;
}
.editbutton {
  height: auto;
  width: auto;
  color: #484848;
  background: #fff;
  transition: .2s;
  cursor: pointer;
}
.editbutton:hover {
  background: #f3f3f3;
}
</style>

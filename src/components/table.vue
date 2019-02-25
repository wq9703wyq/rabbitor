<template>
    <table class="tableWill tableOut" border="1" rules="all" cellpadding="10" onpaste="return false">
      <tr v-for="r in row" :key="r">
        <td v-for="c in col" :key="c"></td>
      </tr>
    </table>
</template>

<script>
export default {
  name: 'tableWill',
  data () {
    return {
      col: 0,
      row: 0
    }
  }
}
</script>

<style scoped>
  .tableWill {
    border-color: #d3d3d3;
  }
</style>

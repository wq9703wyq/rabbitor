<template>
    <div class="quoteView" id="quoteView" contentEditable="true" v-html="innerHtml" onpaste="return false">
    </div>
</template>

<script>
export default {
  name: 'quote'
}
</script>
<style scoped>
  .quoteView {
    padding: 10px;
    border-left: 5px solid #d6d4d4;
    color: #d6d4d4;
    white-space: pre-wrap
  }
</style>

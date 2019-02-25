<template>
  <a :href="link" class="hyperlink" @click="openLink(link)">{{linkName}}</a>
</template>

<script>
export default {
  name: 'hyperlink',
  methods: {
    openLink: function (link) {
      window.open(link)
    }
  }
}
</script>

<style scoped>
  .hyperlink {
    color: #5faeff;
    cursor: pointer;
    transition: .3s;
  }
  .hyperlink:hover {
    color: #3c5aff;
  }
</style>

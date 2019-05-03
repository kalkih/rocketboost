<template>
  <div class="about">
    <h1><center>About {{ name }}</center></h1>
  </div>
</template>

<script>
export default {
  name: 'about',
  created () {
    this.$store.dispatch('theme/setPageTheme', 'moon')
  },
  destroyed () {
    this.$store.dispatch('theme/setPageTheme', 'default')
  },
  computed: {
    name: () => process.env.VUE_APP_NAME,
  },
}
</script>

<template>
  <div class="about">
    <h1><center>About {{ name }}</center></h1>
  </div>
</template>

<script>
export default {
  name: 'about',
  created () {
    this.$store.dispatch('setTheme', 'moon')
  },
  destroyed () {
    this.$store.dispatch('setTheme', 'default')
  },
  computed: {
    name: () => process.env.VUE_APP_NAME,
  },
}
</script>

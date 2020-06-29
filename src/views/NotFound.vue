<template>
  <div class="not-found">
    <div>
      <h1>404</h1>
      <h2>Not Found</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  created() {
    this.$store.dispatch('theme/setPageTheme', 'moon')
  },
  destroyed() {
    this.$store.dispatch('theme/setPageTheme', 'default')
  },
}
</script>

<style lang="scss" scoped>
.not-found {
  div {
    position: fixed;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    white-space: nowrap;

    h1 {
      font-size: 25vw;
      text-align: center;
    }

    h2 {
      font-size: 10vw;
      margin: 0 auto;
      text-align: center;
    }

    @media only screen and (min-width: 640px) {
      height: 100%;

      h1 {
        font-size: 20vh;
      }
      h2 {
        font-size: 8vh;
      }
    }
  }
}
</style>

<template>
  <a class="base-button" :class="{ loading, link }" @click="click">
    <div class="button__spinner"></div>
    <font-awesome-icon v-if="icon" class="button__icon" :icon="icon"/>
    <span class="button__text">{{ text }}</span>
  </a>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    icon: String,
    text: String,
    link: String,
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click (e) {
      e.stopPropagation()
      this.$router.push({ path: this.link })
    },
  },
}
</script>

<style scoped lang="scss">
  .base-button {
    @extend %button;
  }
</style>

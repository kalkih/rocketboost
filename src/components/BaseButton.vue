<template>
  <a class="base-button" :class="{ loading, link }" @click="e => link && click(e)" v-touch-feedback>
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
  data () {
    return {
      extRegex: /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i,
    }
  },
  computed: {
    isExternal () {
      return this.extRegex.exec(this.link) || false
    },
  },
  methods: {
    click (e) {
      e.stopPropagation()
      if (this.isExternal) {
        window.open(this.link, '_blank')
      } else {
        this.$router.push({ path: this.link })
      }
    },
  },
}
</script>

<style scoped lang="scss">
  @import '../styles/base/_button';
  .base-button {
    @extend %button;
  }
</style>

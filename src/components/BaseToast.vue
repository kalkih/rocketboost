<template>
  <div class="base-toast" :class="[`--${type}`]" @click="handleClick()" v-touch-feedback>
    <p v-if="title">{{ title }}</p>
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BaseToast',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: String,
    text: String,
    type: String,
    action: Function,
  },
  methods: {
    ...mapActions({
      dismiss: 'toasts/remove',
    }),
    handleClick() {
      if (this.action) {
        this.action()
      }
      this.dismiss(this.id)
    },
  },
}
</script>

<style scoped lang="scss">
.base-toast {
  -webkit-tap-highlight-color: transparent;
  background: var(--notification-background-color);
  border-radius: var(--button-border-radius, --border-radius);
  border: 1px solid var(--notification-border-color);
  color: var(--notification-text-color, --primary-text-color);
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.075em;
  line-height: 1.5em;
  padding: 1.2em 1.6em;
  text-align: center;

  &.--hover {
    opacity: var(--notification-opacity--hover);
  }
}
</style>

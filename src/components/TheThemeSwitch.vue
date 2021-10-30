<template>
  <div class="the-theme-switch">
    <font-awesome-icon icon="glasses" />
    <div class="the-theme-switch__switch">
      <span :class="{ active: isActive('light') }" @click="setTheme('light')" v-touch-feedback
        >Light</span
      >
      <span :class="{ active: isActive('dynamic') }" @click="setTheme('dynamic')" v-touch-feedback
        >colorful</span
      >
      <span :class="{ active: isActive('dark') }" @click="setTheme('dark')" v-touch-feedback
        >Dark</span
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TheThemeSwitch',
  methods: {
    ...mapActions({
      setTheme: 'theme/setTheme',
    }),
    isActive(theme) {
      return theme === this.theme
    },
  },
  computed: {
    ...mapState({
      theme: (state) => state.theme.theme,
    }),
  },
}
</script>

<style scoped lang="scss">
.the-theme-switch {
  font-size: 1.4em;
  text-align: center;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;

  > svg {
    margin: 1em;
    opacity: 0.75;
  }
  &__switch {
    display: flex;
    overflow: hidden;

    > span {
      font-weight: 600;
      font-size: 0.9em;
      cursor: pointer;
      padding: 0.4em 0.8em;
      opacity: 0.75;
      border-radius: var(--border-radius);
      text-transform: lowercase;
      -webkit-tap-highlight-color: transparent;

      &.--hover {
        background: var(--button-background-color);
      }

      &.active {
        background: var(--button-background-color);
        opacity: 1;
      }
    }
  }
}
</style>

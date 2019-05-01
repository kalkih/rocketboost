<template>
  <div class='the-theme-switch'>
    <h3>Theme</h3>
    <div class="the-theme-switch__switch">
      <span :class="{active: isActive('dark')}" @click="setTheme('dark')">Dark</span>
      <span :class="{active: isActive('default')}" @click="setTheme('default')">Default</span>
      <span :class="{active: isActive('light')}" @click="setTheme('light')">Light</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'TheThemeSwitch',
  methods: {
    ...mapActions([
      'setTheme',
    ]),
    isActive (theme) {
      return theme === this.theme
    },
  },
  computed: {
    ...mapState({
      theme: state => state.theme,
    }),
  },
}
</script>

<style scoped lang="scss">
  .the-theme-switch {
    font-size: 1.4em;
    text-align: center;
    width: 100%;
    h3 {
      font-weight: 700;
      opacity: .75;
      font-size: 1em;
    }
    &__switch {
      > span {
        font-weight: 600;
        font-size: 0.9em;
        cursor: pointer;
        padding: .4em;
        margin: 0 .4em;
        opacity: .75;

        &:hover {
          color: var(--accent-color);
        }

        &.active {
          color: var(--accent-color);
          opacity: 1;
        }
      }
    }
  }
</style>

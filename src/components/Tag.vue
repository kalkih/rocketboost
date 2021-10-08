<template>
  <a class="tag" @click="more" v-touch-feedback>
    <font-awesome-icon :icon="icon" />
    <span>{{ text }}</span>
  </a>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    icon: String,
    text: String,
    route: String,
  },
  methods: {
    more(e) {
      e.stopPropagation()
      this.$router.push({ path: this.route })
    },
  },
}
</script>

<style scoped lang="scss">
.tag {
  user-select: none;
  font-size: 1.1em;
  padding: 0.4em 0.6em;
  margin: 0 0.8em;
  border-radius: var(--border-radius);
  color: var(--primary-text-color);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  align-self: center;
  background-color: var(--button-background-color);
  max-width: 100%;
  text-align: left;
  border: 1px solid transparent;
  min-width: calc(1em + (0.65em * 2));
  letter-spacing: 0.025em;
  transition: background-color 0.1s, border-color 1s, transform 0.25s;

  &:first-child,
  &:last-child {
    margin: 0;
  }

  span {
    opacity: 0.8;
    font-weight: 500;
    text-align: left;
    margin-left: calc(1em + 0.6em * 2);
  }

  svg {
    position: absolute;
    width: 1em;
    top: 0.35em;
    left: 0.4em;
    font-size: 1.2em;
    color: var(--primary-text-color);
  }

  &:before {
    content: '';
    background-color: rgba(255, 255, 255, 0.1);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: calc(1em + (0.6em * 2));
    border-right: 1px solid rgba(0, 0, 0, 0.15);
  }

  &.--hover {
    background-color: transparent;
    border-color: var(--button-border-color);
    transition: border-color 0s;

    &:before {
      background: transparent;
      border-color: transparent;
    }
  }
}
</style>

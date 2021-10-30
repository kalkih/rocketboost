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
  padding: 0.6em 0.8em;
  margin: 0 0.8em;
  border-radius: var(--tag-border-radius);
  color: var(--primary-text-color);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  align-self: center;
  background-color: var(--tag-background-color);
  max-width: 100%;
  text-align: left;
  border: 1px solid var(--tag-border-color, transparent);
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
    margin-left: calc(1em + 0.5em + 0.2em);
  }

  svg {
    position: absolute;
    width: 1em;
    top: 0.5em;
    left: 0.6em;
    font-size: 1.2em;
    color: var(--primary-text-color);
  }

  &.--hover {
    background-color: transparent;
    border-color: var(--tag-border-color--hover);
    transition: border-color 0s;
  }
}
</style>

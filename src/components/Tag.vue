<template>
  <a class="tag" @click="more">
    <font-awesome-icon :icon="icon"/>
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
    more (e) {
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
    padding: .4em .6em;
    margin: 0 .8em;
    border-radius: var(--border-radius);
    color: var(--primary-text-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    align-self: center;
    background-color: rgba(255,255,255,0.2);
    max-width: 100%;
    text-align: left;
    border: 1px solid transparent;
    min-width: calc(1em + (.65em * 2));
    letter-spacing: 0.025em;
    transition: background-color .1s, border-color 1s;

    &:first-child, &:last-child {
      margin: 0;
    }

    span {
      opacity: .8;
      font-weight: 500;
      text-align: left;
      margin-left: calc(1em + .6em * 2);
    }

    svg {
      position: absolute;
      width: 1em;
      top: .35em;
      left: .4em;
      font-size: 1.2em;
      color: var(--primary-text-color);
    }

    &:before {
      content: '';
      background-color: rgba(255,255,255,.1);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: calc(1em + (.6em * 2));
      border-right: 1px solid rgba(0,0,0,0.25);
    }

    &:hover {
      background-color: transparent;
      border-color: rgba(255,255,255,0.5);
      transition: border-color 0s;

      &:before {
        background: transparent;
        border-color: transparent;
      }
    }
  }
</style>

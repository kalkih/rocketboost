<template>
  <router-link class="launch-overview-item" :class="{ '--link': link }" :to="link">
    <h4 v-if="title">
      {{ title }}
    </h4>
    <span v-if="text">{{ text }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'LaunchOverviewItem',
  props: {
    title: String,
    text: String,
    link: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.launch-overview-item {
  position: relative;
  padding: 1em;
  flex: 1;
  font-size: 1.2em;
  font-weight: 500;
  color: var(--primary-text-color);
  cursor: default;
  overflow: hidden;

  @media only screen and (min-width: 640px) {
    min-width: 180px;
  }

  &.--link {
    cursor: pointer;
    border-radius: var(--border-radius);

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 0px;
      height: 0px;
      border-left: 0.6em solid transparent;
      border-bottom: 0.6em solid var(--primary-text-color);
      opacity: 0.25;
    }

    &:hover {
      background: var(--card-background--hover);

      span {
        opacity: 0.9;
      }
      &:after {
        opacity: 0.5;
      }
    }
  }

  h4 {
    margin: 0 0 0.4em 0;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 0.9em;
  }

  span {
    opacity: 0.75;
  }
}
</style>

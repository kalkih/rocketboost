<template>
  <router-link class="launch-overview-item" :class="{'--link': link}" :to="link">
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
    color: $primary-text-color;
    cursor: default;
    overflow: hidden;

    @media only screen and (min-width: 640px) {
      min-width: 180px;
    }

    &.--link {
      cursor: pointer;
      border-radius: $border-radius;

      &:after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0px;
        height: 0px;
        border-left: .6em solid transparent;
        border-bottom: .6em solid $primary-text-color;
        opacity: .25;
      }

      &:hover {
        background: $card-background--hover;

        span {
          opacity: .9;
        }
        &:after {
          opacity: .5;
        }
      }
    }

    h4 {
      margin: 0 0 .4em 0;
      font-weight: 600;
      letter-spacing: .05em;
      text-transform: uppercase;
      font-size: .9em;
    }

    span {
      opacity: .75;
    }
  }
</style>

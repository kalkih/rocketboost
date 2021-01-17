<template>
  <a class="base-button share-button" @click.stop="share()" v-if="supported" v-touch-feedback>
    <font-awesome-icon class="button__icon" icon="share-alt" />
    <span class="button__text">Share</span>
  </a>
</template>

<script>
export default {
  name: 'ShareButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
  },
  computed: {
    url: () => window.location.href,
    supported: () => navigator.share,
  },
  methods: {
    async share() {
      try {
        const { url, title, text } = this
        await navigator.share({ url, title, text })
      } catch {
        // eslint-disable-next-line no-console
        console.info('Sharing is not supported on current device')
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/setup/_variables';
@import '../styles/base/_button';

.base-button {
  @extend %button;
  font-weight: 600;
  padding: 0.8em 1.2em;
  animation: pop-reverse 0.35s;
  display: flex;

  &.--right {
    transform-origin: right;
  }

  &.--left {
    transform-origin: left;
  }

  &.--hover {
    background-color: rgba($saturn-text-color, 0.65);
  }

  &.--subscribed {
    animation: pop 0.35s;

    .button__icon {
      color: $saturn-text-color;
    }

    &.--hover {
      background-color: rgba($mars-text-color, 0.5);
    }
  }

  .button__icon {
    margin-right: 0.8em;
    margin-bottom: 0.1em;
  }

  @keyframes pop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes pop-reverse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>

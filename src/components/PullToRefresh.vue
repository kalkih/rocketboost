<template>
  <div class="pull-to-refresh" :style="styleList" :class="{ '--refreshing': refreshing }">
    <div class="pull-to-refresh__indicator">
      <span>Refreshing</span>
    </div>
    <div class="pull-to-refresh__wrapper" ref="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
const SWIPE_THRESHOLD = 100
export default {
  name: 'PullToRefresh',
  data() {
    return {
      touchStart: null,
      touchOffset: null,
      refreshing: false,
      triggered: false,
    }
  },
  computed: {
    styleList() {
      return (
        this.touchOffset && {
          '--offset': `${this.touchOffset}px`,
          '--transition': 'none',
          '--progress': this.touchOffset / SWIPE_THRESHOLD,
        }
      )
    },
  },
  methods: {
    moveHandler(e) {
      e.stopPropagation()
      if (this.touchStart || this.triggered) e.preventDefault()
      if (this.triggered) return
      if (window.scrollY > 0) {
        this.reset()
      }
      if (this.touchStart === null) {
        this.touchStart = e.touches[0].pageY
      }
      const offset = e.touches[0].pageY - this.touchStart

      if (offset < 0) this.reset()
      this.touchOffset = offset
      if (this.isThresholdMet()) {
        this.reset()
        this.triggered = true
        this.handleRefresh()
      }
    },
    handleRefresh() {
      this.refreshing = true
      // Mock refresh event
      setTimeout(() => {
        this.refreshing = false
      }, 1000)
    },
    endHandler(e) {
      e.stopPropagation()
      this.reset()
    },
    reset() {
      this.triggered = false
      this.touchStart = null
      this.touchOffset = null
    },
    isThresholdMet() {
      return this.touchOffset > SWIPE_THRESHOLD
    },
  },
  mounted() {
    this.$refs.container.addEventListener('touchmove', this.moveHandler)
    this.$refs.container.addEventListener('touchend', this.endHandler)
  },
  beforeDestroy() {
    this.$refs.container.removeEventListener('touchmove', this.moveHandler)
    this.$refs.container.removeEventListener('touchend', this.endHandler)
  },
}
</script>

<style scoped lang="scss">
.pull-to-refresh {
  --transition: transform 0.25s ease, opacity 0.25s;
  --offset: 0px;
  --progress: 0;
  width: 100%;
  height: 100%;

  &__wrapper {
    width: 100%;
    height: 100%;
    transform: translate3d(0, var(--offset, 0px), 0) translateZ(0);
    transition: var(--transition);
  }
  &__indicator {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate3d(0, calc(var(--offset) / 2), 0) scale(var(--progress)) translateZ(0);
    transition: var(--transition);
    opacity: var(--progress);
    font-size: 2em;
  }

  &.--refreshing {
    .pull-to-refresh__wrapper {
      transform: translate3d(0, 100px, 0) translateZ(0);
    }
    .pull-to-refresh__indicator {
      transform: translate3d(0, 50px, 0) scale(1) translateZ(0);
      opacity: 1;
    }
  }
}
</style>

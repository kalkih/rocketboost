<template>
  <div class="ticker">
    <span class="ticker__unit --years" v-if="years >= 1">{{ years }}<span>years</span></span>
    <span class="ticker__divider" v-if="years >= 1">:</span>
    <span class="ticker__unit --days">{{ days }}<span>days</span></span>
    <span class="ticker__divider">:</span>
    <span class="ticker__unit --hours">{{ hours }}<span>hours</span></span>
    <span class="ticker__divider">:</span>
    <span class="ticker__unit --minutes">{{ minutes }}<span>minutes</span></span>
    <span class="ticker__divider">:</span>
    <span class="ticker__unit --seconds">{{ seconds }}<span>seconds</span></span>
  </div>
</template>

<script>

const MILLISECONDS_SECOND = 1000
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR
const MILLISECONDS_YEAR = 365 * (24 * MILLISECONDS_HOUR)

export default {
  props: {
    timestamp: {
      type: String,
    },
    start: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      counting: false,
      totalMilliseconds: 0,
      interval: 1000,
      timer: null,
    }
  },
  computed: {
    time () {
      return new Date(this.timestamp).getTime()
    },
    years () {
      return this.format(this.totalMilliseconds / MILLISECONDS_YEAR)
    },
    days () {
      return this.format((this.totalMilliseconds % MILLISECONDS_YEAR) / MILLISECONDS_DAY)
    },
    hours () {
      return this.format(((this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR))
    },
    minutes () {
      return this.format((this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE)
    },
    seconds () {
      return this.format((this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND)
    },
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler () {
        if (this.start) {
          this.totalMilliseconds = this.time - Date.now()
          this.updateTicker()
          this.startTicker()
        }
      },
    },
  },
  methods: {
    startTicker: function () {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.updateTicker()
      }, this.interval)
    },
    updateTicker: function () {
      this.totalMilliseconds -= this.interval
    },
    format: function (value) {
      value = Math.floor(Math.abs(value))
      return value < 10 ? `0${value}` : value
    },
  },
  destroyed () {
    clearInterval(this.timer)
  },
}
</script>

<style scoped lang="scss">
  .ticker {
    position: relative;
    padding-right: 2em;
    padding-bottom: .7em;
    font-size: 2em;
    font-weight: 500;
    line-height: 1em;
    letter-spacing: .1em;
    user-select: none;
    font-variant-numeric: tabular-nums;
    font-family: 'Varela Round', sans-serif;

    .ticker__divider {
      opacity: .75;
      margin: 0 .1em 0 2.1em;
    }

    .ticker__unit {
      position: absolute;
      width: 2em;

      & > span {
        font-family:
          'Montserrat',
          'Helvetica Neue',
          Helvetica,
          Arial,
          sans-serif;
        position: absolute;
        bottom: -2.4em;
        font-size: .4em;
        font-weight: 700;
        letter-spacing: initial;
        left: 50%;
        transform: translateX(-50%);
        text-transform: uppercase;
        opacity: .75;
      }
    }
  }
</style>

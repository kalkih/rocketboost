<template>
  <div class="launch-card" :class="[{ '--placeholder': launch.placeholder }]" @click="more">
    <template v-if="!launch.placeholder">
      <h3 class="launch-card__title">
        <span class="launch-card__title--primary" :class="theme">{{ launch.rocket.name }}</span>
        <span class="launch-card__title--secondary">{{ launch.mission.short }}</span>
      </h3>
      <div class="launch-card__date">
        <transition name="swap">
          <template v-if="launch.net">
            <ticker v-if="ticker && !tickerThreshold" :timestamp="launch.net" key="ticker" />
            <timeago
              v-else
              class="timeago"
              :datetime="launch.net"
              :auto-update="60 * 5"
              key="past"
            />
          </template>
          <span class="tbd" v-else key="tbd">Date to be determined</span>
        </transition>
      </div>
      <div class="launch-card__description">
        <p class="launch-card__desc">{{ launch.mission.description }}</p>
      </div>
      <div class="launch-card__tags">
        <tag
          :text="launch.rocket.name"
          icon="rocket"
          :route="`/rockets/${encodeURIComponent(launch.rocket.name)}`"
        />
        <tag
          :text="launch.location.short"
          icon="globe-americas"
          :route="`/locations/${encodeURIComponent(launch.location.name)}`"
        />
        <tag
          :text="launch.lsp.short"
          icon="building"
          :route="`/providers/${encodeURIComponent(launch.lsp.name)}`"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import theme from '../mixins/themes'
import launchMixin from '../mixins/launch'
import Tag from './Tag'
import Ticker from './Ticker'
import { TICKER_MAX_THRESHOLD } from '../utils/constants'

export default {
  components: { Tag, Ticker },
  mixins: [theme, launchMixin],
  props: {
    launch: Object,
    ticker: {
      type: Boolean,
      default: true,
    },
    forced: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tickerThreshold() {
      return new Date(this.launch.net) - new Date() > TICKER_MAX_THRESHOLD
    },
  },
  methods: {
    more() {
      this.setCurrentLaunch(this.launch)
      this.$router.push({ path: `/launch/${this.launch.id}` })
    },
    ...mapActions({
      setCurrentLaunch: 'launches/setCurrentLaunch',
      unsetState: 'launches/unsetState',
    }),
  },
}
</script>

<style scoped lang="scss">
@import '../styles/components/LaunchCard.scss';
</style>

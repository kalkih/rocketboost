<template>
  <div
    class="launch-card"
    :class="[{ '--placeholder': launch.placeholder }]"
    @click="more"
    @mouseover="setHover(true)"
    @mouseleave="setHover(false)"
    @touchstart="setHover(true)"
    @touchend="setHover(false)">
    <template v-if="!launch.placeholder">
      <h3 class="launch-card__title">
        <span class="launch-card__title--primary" :class="theme">{{ launch.rocket.name }}</span>
        <span class="launch-card__title--secondary">{{ launch.mission.short }}</span>
      </h3>
      <div class="launch-card__date">
        <transition name="swap">
          <template v-if="!launch.tbddate || hover || forced">
            <ticker v-if="ticker" :timestamp="launch.net" key="ticker"/>
            <timeago v-else class="timeago" :datetime="launch.net" :auto-update="60 * 5" key="past" />
          </template>
          <span class="tbd" v-else key="tbd">
            Date to be determined
          </span>
        </transition>
      </div>
      <div class="launch-card__description">
        <p class="launch-card__desc" :class="{'--hide': hover }">
          {{ launch.mission.description }}
        </p>
        <transition name="swap">
          <span v-if="hover" class="launch-card__more" :key="hover">Read more</span>
        </transition>
      </div>
      <div class="launch-card__tags">
        <tag :text="launch.rocket.name" icon="rocket" :route="`/rocket/${encodeURIComponent(launch.rocket.name)}`"/>
        <tag :text="launch.location.short" icon="globe-americas" :route="`/location/${encodeURIComponent(launch.location.name)}`"/>
        <tag :text="launch.lsp.short" icon="building" :route="`/lsp/${encodeURIComponent(launch.lsp.name)}`"/>
      </div>
    </template>
  </div>
</template>

<script>
import Tag from './Tag.vue'
import Ticker from './Ticker.vue'
import theme from '../mixins/themes.js'
import launchMixin from '../mixins/launch.js'
import { mapActions } from 'vuex'

export default {
  components: { Tag, Ticker },
  mixins: [ theme, launchMixin ],
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
  data () {
    return {
      hover: false,
    }
  },
  methods: {
    more () {
      this.setCurrentLaunch(this.launch)
      this.$router.push({ path: `/launch/${this.launch.id}` })
    },
    ...mapActions({
      setCurrentLaunch: 'launches/setCurrentLaunch',
      unsetState: 'launches/unsetState',
    }),
    setHover (state) {
      this.hover = state
    },
  },
}
</script>

<style scoped lang="scss">
  @import '../styles/components/LaunchCard.scss'
</style>

<template>
  <div
    class="launch-card"
    :class="[ { '--placeholder': launch.placeholder } ]"
    @click="more">
    <template v-if="!launch.placeholder">
      <h3 class="launch-card__title">
        <span class="launch-card__title--primary" :class="theme">{{ launch.rocket.name }}</span>
        <span class="launch-card__title--secondary">{{ launch.mission.short }}</span>
      </h3>
      <span class="tbd" v-if="launch.tbddate">
        Date to be determined
      </span>
      <template v-else>
        <ticker v-if="ticker" :timestamp="launch.net" />
        <timeago v-else class="timeago" :datetime="launch.net" :auto-update="60 * 5" />
      </template>
      <div class="launch-card__main">
        <div class="launch-card__description">
          <p class="launch-card__desc">
            {{ launch.mission.description }}
          </p>
          <span class="launch-card__more">Read more</span>
        </div>
        <div class="launch-card__tags">
          <tag :text="launch.rocket.name" icon="rocket" :route="`/rocket/${encodeURIComponent(launch.rocket.name)}`"/>
          <tag :text="launch.location.short" icon="globe-americas" :route="`/location/${encodeURIComponent(launch.location.name)}`"/>
          <tag :text="launch.lsp.short" icon="building" :route="`/lsp/${encodeURIComponent(launch.lsp.name)}`"/>
        </div>
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
  },
}
</script>

<style scoped lang="scss">
  @import '../styles/components/LaunchCard.scss'
</style>

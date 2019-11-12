<template>
  <div
    class="launch-overview"
    :class="[{ '--placeholder': launch.placeholder }]">
    <template v-if="launch.id">
      <h2 class="launch-overview__title">
        <span class="launch-overview__title--primary">{{ launch.rocket.name }}</span>
        <span class="launch-overview__title--secondary">{{ launch.mission.short }}</span>
      </h2>
      <div class="launch-overview__status" v-if="status">{{ status }}</div>
      <ticker :timestamp="launch.net" />
      <!-- <div class="launch-overview__status" v-if="probability">Probability {{ probability }}%</div> -->
      <p class="launch-overview__desc">{{ launch.mission.description }}</p>
      <base-button
        class="launch-overview__watch"
        v-if="stream"
        :link="stream"
        :text="active ? 'Watch live' : 'Watch replay'">
      </base-button>
      <div class="launch-overview__details">
        <launch-overview-row title="DEBUG" v-if="dev">
          <launch-overview-item title="probability" :text="launch.probability.toString()" />
          <launch-overview-item title="status" :text="launch.status.toString()" />
          <launch-overview-item title="status string" :text="status" />
          <launch-overview-item title="tbddate" :text="launch.tbddate.toString()" />
        </launch-overview-row>
        <launch-overview-row title="Launch provider">
          <launch-overview-item :text="launch.lsp.name" :link="'/lsp/' + encodeURIComponent(launch.lsp.name)" />
          <launch-overview-item :text="launch.lsp.countryCode"/>
        </launch-overview-row>
        <launch-overview-row title="Launch location">
          <launch-overview-item
            title="Site"
            :text="launch.location.name"
            :link="'/location/' + encodeURIComponent(launch.location.name)" />
          <launch-overview-item
            v-if="launch.location.pads[0].name"
            title="Pad"
            :text="launch.location.pads[0].name" />
        </launch-overview-row>
        <launch-overview-row title="Launch window">
          <launch-overview-item title="Open" :text="localTime(launch.windowstart)" />
          <launch-overview-item title="NET" :text="localTime(launch.net)" />
          <launch-overview-item title="Close" :text="localTime(launch.windowend)" />
        </launch-overview-row>
        <launch-overview-row title="Launch vehicle">
          <launch-overview-item
            title="Rocket"
            :text="launch.rocket.name"
            :link="'/rocket/' + encodeURIComponent(launch.rocket.name)" />
          <launch-overview-item
            v-if="launch.rocket.configuration"
            title="Configuration"
            :text="launch.rocket.configuration"/>
          <launch-overview-item
            v-if="launch.rocket.familyname"
            title="Family"
            :text="launch.rocket.familyname"/>
        </launch-overview-row>
        <template v-for="(payload, index) in launch.mission.payloads">
          <launch-overview-row
            :title="index === 0 ? 'Payloads' : null"
            :key="index">
            <launch-overview-item title="Payload" :text="payload.name" />
            <launch-overview-item title="Mass" :text="payload.mass || 'unknown'" />
          </launch-overview-row>
        </template>
      </div>
    </template>
    <h1 v-else-if="!launch.placeholder" style='text-align: center'>404: NOT FOUND</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Ticker from './Ticker.vue'
import BaseButton from './BaseButton'
import LaunchOverviewRow from './LaunchOverviewRow'
import LaunchOverviewItem from './LaunchOverviewItem'
import launchMixin from '../mixins/launch.js'

export default {
  name: 'LaunchOverview',
  components: {
    LaunchOverviewRow,
    LaunchOverviewItem,
    Ticker,
    BaseButton,
  },
  mixins: [ launchMixin ],
  computed: {
    id () {
      return this.$route.params.id
    },
    ...mapState({
      launch: state => state.launches.current,
    }),
    dev () {
      return process.env.NODE_ENV === 'development'
    },
  },
  methods: {
    localTime (date) {
      return new Date(date).toLocaleString()
    },
  },
  created () {
    this.$store.dispatch('launches/unsetCurrent', { id: this.id })
    this.$store.dispatch('launches/getLaunch', { id: this.id })
  },
}
</script>

<style scoped lang="scss">
  @import '../styles/base/_spinner';
  $margin: 20px;

  .launch-overview {
    position: relative;
    display: flex;
    align-items: center;
    flex-flow: column;
    padding: 1.4em;
    min-width: 0;
    text-align: center;
    font-size: 13px;
    animation: fade-in .25s;
    margin-top: 2em;
    width: 100%;

    > * {
      margin: $margin 0;
    }

    &.--placeholder {
      animation: none;
      @extend %spinner;
      height: 100%;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      overflow: visible;
      font-size: 3em;

      &:after {
        top: 50%;
        opacity: 1;
      }
    }

    &__title {
      font-weight: 500;
      font-size: 1.8em;
      margin-top: 0;
      margin-bottom: $margin;
      display: flex;
      flex-flow: column;
      letter-spacing: .1em;

      &--primary {
        transition: border .15s;
        font-size: 1.4em;
        margin-bottom: .1em;
      }
      &--secondary {
        font-size: 1em;
        font-weight: 500;
        opacity: .75;
      }
    }
    &__status {
      font-size: 1.8em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .1em;
      width: 100%;
    }
    &__desc {
      font-size: 1.2em;
      line-height: 1.5em;
    }
    &__watch {
      font-size: 1em;
      display: block;
      white-space: pre;
      padding: 1.4em 2em;
      font-weight: 600;
    }
    &__details {
      max-width: 360px;

      @media only screen and (min-width: 640px) {
        max-width: 640px;
      }

      h3 {
        font-size: 1.4em;
        font-weight: 500;
        text-transform: uppercase;
        margin: 1em;
      }
    }
    .ticker {
      @media only screen and (min-width: 640px) {
        font-size: 3em;
      }
    }
  }
</style>

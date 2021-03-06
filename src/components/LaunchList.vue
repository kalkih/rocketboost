<template>
  <div class="launch-list">
    <div class="launch-list__header" v-if="title">
      <font-awesome-icon v-if="icon" :icon="icon" />
      <h1>
        <span>{{ filter }}</span>
        <span>{{ search }}</span>
      </h1>
      <subscribe-button v-if="state && filter" :id="filter" :topic="state" />
    </div>
    <launch-card-featured v-if="featured" :launch="featured" :forced="true" />
    <div class="launch-list__content">
      <h2 class="launch-list__heading">
        <div class="--divider"></div>
        <span class="--text">Upcoming</span>
        <div class="--divider"></div>
      </h2>
      <template v-if="hasNext">
        <section class="launch-list__section --upcoming">
          <launch-card v-for="(launch, index) in next" :key="index" :launch="launch" />
        </section>
        <base-button
          class="launch-list__more-button"
          v-if="more.next"
          @click.native="fetchMoreNext"
          text="Load more"
          :loading="loading.next"
        />
        <h3 v-else class="launch-list__heading --medium">phew... that was the last one!</h3>
      </template>
      <h3 v-else class="launch-list__heading --tall">No upcoming Launches</h3>
      <h2 class="launch-list__heading">
        <div class="--divider"></div>
        <span class="--text">Past</span>
        <div class="--divider"></div>
      </h2>
      <template v-if="hasPast">
        <section class="launch-list__section --past">
          <launch-card
            v-for="(launch, index) in past"
            :key="index"
            :launch="launch"
            :ticker="false"
          />
        </section>
        <base-button
          class="launch-list__more-button"
          v-if="more.past"
          @click.native="fetchMorePast"
          text="Load more"
          :loading="loading.past"
        />
        <h3 v-else class="launch-list__heading --medium">phew... that was the last one!</h3>
      </template>
      <h3 v-else class="launch-list__heading --tall">No past launches</h3>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LaunchCard from './LaunchCard'
import LaunchCardFeatured from './LaunchCardFeatured'
import BaseButton from './BaseButton'
import SubscribeButton from './SubscribeButton'

export default {
  components: { LaunchCard, LaunchCardFeatured, BaseButton, SubscribeButton },
  name: 'LaunchList',
  props: {
    state: {
      type: String,
      default: 'home',
    },
    query: {
      type: Object,
    },
    title: {
      type: [Boolean, String],
      default: false,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {
      filter: this.$route.params.name || null,
      loading: { next: false, past: false },
      more: { next: true, past: true },
    }
  },
  computed: {
    hasNext() {
      return this.next.length > 0
    },
    hasPast() {
      return this.past.length > 0
    },
    hasFeatured() {
      return this.featured !== null
    },
    getQuery() {
      return {
        filterValue: this.filter,
        search: this.search,
        ...this.query,
      }
    },
    nextOffset() {
      return this.next.length + (this.hasFeatured && this.state === 'home')
    },
    pastOffset() {
      return this.past.length
    },
    ...mapState({
      next(state) {
        this.more.next = true
        if (this.state === 'home') {
          const arr = [...state.launches[this.state].next].slice(1)
          return arr
        }
        return state.launches[this.state].next
      },
      past(state) {
        this.more.past = true
        return state.launches[this.state].past
      },
      search(state) {
        return state.launches[this.state].search
      },
      featured(state) {
        return this.state === 'home' ? state.launches[this.state].next[0] : null
      },
      id(state) {
        return state.launches[this.state].id
      },
    }),
  },
  methods: {
    ...mapActions({
      getMoreNext: 'launches/getMoreNextLaunches',
      getMorePast: 'launches/getMorePastLaunches',
      unsetState: 'launches/unsetState',
      getNext: 'launches/getNextLaunches',
      getPast: 'launches/getPastLaunches',
      refresh: 'launches/refresh',
    }),
    async fetchMoreNext() {
      this.loading.next = true
      const fetched = await this.getMoreNext({
        state: this.state,
        offset: this.nextOffset,
        ...this.getQuery,
      })
      if (fetched === 0) this.more.next = false
      this.loading.next = false
    },
    async fetchMorePast() {
      this.loading.past = true
      const fetched = await this.getMorePast({
        state: this.state,
        offset: this.pastOffset,
        ...this.getQuery,
      })
      if (fetched === 0) this.more.past = false
      this.loading.past = false
    },
  },
  async created() {
    const { state, getQuery, filter, id } = this
    if (id !== filter && this.state !== 'home' && this.state !== 'search') {
      await this.unsetState({ state, filter })
    }
    this.refresh({ state, ...getQuery })
  },
  metaInfo() {
    const title = this.filter || this.search
    return {
      title,
      meta: [
        {
          property: 'og:title',
          content: title,
        },
      ],
    }
  },
}
</script>

<style scoped lang="scss">
.launch-list {
  display: flex;
  flex-flow: column;
  align-items: center;

  &__content {
    max-width: 980px;
    width: 100%;
    animation: fade-in 0.5s;
    display: flex;
    flex-flow: column;
  }

  &__header {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: calc(35vh - 77px);
    margin: 0 10px;
    font-size: 1.6em;
    padding: 1em 0;
    margin-top: 1em;

    @media only screen and (min-width: 640px) {
      min-height: calc(40vh - 77px);
      font-size: 2em;
      margin-top: 1.6em;
    }

    h1 {
      font-weight: 600;
    }

    svg {
      font-size: 3em;
    }

    .base-button {
      font-size: 0.6em;
      margin: 0;
    }
  }

  &__heading {
    display: block;
    position: relative;
    text-align: center;
    font-size: 1.8em;
    margin: 1em 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    justify-content: center;

    &.--tall {
      height: 6em;
    }

    &.--medium {
      height: 4em;
      text-transform: initial;
    }

    .--divider {
      content: '';
      height: 1px;
      width: 100%;
      background: var(--primary-text-color);
      opacity: 0.5;
    }
    .--text {
      margin: 0 0.6em;
    }
  }

  &__more-button {
    margin: 3em 0;
    font-weight: 500;
    align-self: center;
    padding: 1.4em 2.6em;
  }

  &__section {
    display: flex;
    flex-flow: column;
    align-items: center;

    > div {
      margin: var(--card-margin--mobile);
    }

    @media only screen and (min-width: 640px) {
      flex-flow: row;
      flex-wrap: wrap;
      justify-content: space-evenly;

      > div {
        max-width: calc(50% - calc(var(--card-margin) * 2));
        margin: var(--card-margin) calc(var(--card-margin) / 2);
        flex: auto;
        align-self: stretch;
      }
    }
  }
}
</style>

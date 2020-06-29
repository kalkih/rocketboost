<template>
  <div class="subscriptions">
    <div class="subscriptions__header">
      <h1>
        <span>Subscriptions</span>
      </h1>
      <base-button v-if="hasSubscriptions" @click.native="unsubscribeAll()" text="Remove all" />
    </div>
    <div class="subscriptions__content" v-if="hasSubscriptions">
      <template v-if="providerSubscriptions.length">
        <h2 class="rocketboost-heading">
          <div class="--divider"></div>
          <span class="--text">Provider</span>
          <div class="--divider"></div>
        </h2>
        <div class="subscription__list">
          <div
            class="subscription__item"
            @click.stop="navigateTo(sub.topic, sub.id)"
            v-for="sub in providerSubscriptions"
            :key="sub.id"
            v-touch-feedback
          >
            <h3 class="subscription__item__title ellipsis">{{ sub.id }}</h3>
            <subscribe-button :id="sub.id" :topic="sub.topic" />
          </div>
        </div>
      </template>
      <template v-if="rocketSubscriptions.length">
        <h2 class="rocketboost-heading">
          <div class="--divider"></div>
          <span class="--text">Rocket</span>
          <div class="--divider"></div>
        </h2>
        <div class="subscription__list">
          <div
            class="subscription__item"
            @click.stop="navigateTo(sub.topic, sub.id)"
            v-for="sub in rocketSubscriptions"
            :key="sub.id"
            v-touch-feedback
          >
            <h3 class="subscription__item__title ellipsis">{{ sub.id }}</h3>
            <subscribe-button :id="sub.id" :topic="sub.topic" />
          </div>
        </div>
      </template>
      <template v-if="locationSubscriptions.length">
        <h2 class="rocketboost-heading">
          <div class="--divider"></div>
          <span class="--text">Location</span>
          <div class="--divider"></div>
        </h2>
        <div class="subscription__list">
          <div
            class="subscription__item"
            @click.stop="navigateTo(sub.topic, sub.id)"
            v-for="sub in locationSubscriptions"
            :key="sub.id"
            v-touch-feedback
          >
            <h3 class="subscription__item__title ellipsis">{{ sub.id }}</h3>
            <subscribe-button :id="sub.id" :topic="sub.topic" />
          </div>
        </div>
      </template>
      <template v-if="launchSubscriptions.length">
        <h2 class="rocketboost-heading">
          <div class="--divider"></div>
          <span class="--text">Mission</span>
          <div class="--divider"></div>
        </h2>
        <div class="subscription__list">
          <div
            class="subscription__item"
            @click.stop="navigateTo(sub.topic, sub.id)"
            v-for="sub in launchSubscriptions"
            :key="sub.id"
            v-touch-feedback
          >
            <h3 class="subscription__item__title ellipsis">{{ sub.label || sub.id }}</h3>
            <subscribe-button :id="sub.id" :topic="sub.topic" :label="sub.label" />
          </div>
        </div>
      </template>
    </div>
    <div class="subscriptions__content" v-else>
      <h2 class="nothing">nothing yet...</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SubscribeButton from '../components/SubscribeButton'
import BaseButton from '../components/BaseButton'

export default {
  name: 'subscriptions',
  components: {
    SubscribeButton,
    BaseButton,
  },
  data() {
    return {
      providerSubscriptions: [],
      locationSubscriptions: [],
      rocketSubscriptions: [],
      launchSubscriptions: [],
    }
  },
  created() {
    this.providerSubscriptions = this.$store.getters['subscriptions/providers']
    this.locationSubscriptions = this.$store.getters['subscriptions/locations']
    this.rocketSubscriptions = this.$store.getters['subscriptions/rockets']
    this.launchSubscriptions = this.$store.getters['subscriptions/launches']
  },
  computed: {
    hasSubscriptions() {
      return (
        this.providerSubscriptions.length ||
        this.locationSubscriptions.length ||
        this.rocketSubscriptions.length ||
        this.launchSubscriptions.length
      )
    },
  },
  methods: {
    ...mapActions({
      unsubscribeAll: 'subscriptions/unsubscribeAll',
    }),
    navigateTo(topic, id) {
      this.$router.push({ path: `/${topic}/${encodeURIComponent(id)}` })
    },
  },
}
</script>

<style lang="scss" scoped>
.rocketboost-heading {
  font-size: 1.4em;

  @media only screen and (min-width: 640px) {
    font-size: 1.8em;
  }
}

.subscription {
  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 0.6em;

    @media only screen and (min-width: 640px) {
      font-size: 1em;
    }
  }

  &__item {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 1.4em;
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border-radius: var(--border-radius);
    box-shadow: var(--card-shadow);
    border: 1px solid transparent;
    border-color: var(--card-border-color, transparent);
    margin: 0.4em 0;
    -webkit-tap-highlight-color: transparent;
    transition: border-color, background-color 0.25s;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }

    &.--hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    &__title {
      font-size: 2.4em;
      margin: 0;
      font-weight: 500;
      margin-right: 1em;
    }

    .subscribe-button {
      font-size: 1.4em;

      @media only screen and (min-width: 640px) {
        font-size: 1.2em;
      }
    }
  }
}
.subscriptions {
  display: flex;
  flex-flow: column;
  align-items: center;

  &__header {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 10px;
    font-size: 1.6em;
    padding: 1em 0;

    .base-button {
      font-size: 0.6em;
      font-weight: 600;
      padding: 0.8em 1.2em;
      margin: 0;
    }

    h1 {
      font-weight: 600;
    }

    @media only screen and (min-width: 640px) {
      font-size: 2em;
    }
  }

  &__content {
    max-width: 980px;
    width: 100%;
    animation: fade-in 0.5s;
    display: flex;
    flex-flow: column;
    padding: 0 0.6em;

    .nothing {
      font-size: 2.4em;
      align-self: center;
    }
  }
}
</style>

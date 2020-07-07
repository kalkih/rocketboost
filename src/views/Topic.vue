<template>
  <div class="topics">
    <div class="topics__header">
      <h1>
        <span>{{ title }}</span>
      </h1>
    </div>
    <div class="topics__content">
      <div class="topics__list">
        <div
          class="topic__item"
          @click.stop="navigateTo(entry.name)"
          v-for="entry in all"
          :key="entry.id"
          v-touch-feedback
        >
          <h3 class="topic__item__title ellipsis">{{ entry.name }}</h3>
          <h3 class="topic__item__count ellipsis no-shrink">
            <span class="topic__item__count__sum">{{ entry.count }}</span>
            <span class="topic__item__count__label">launches</span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'topic',
  props: {
    title: {
      type: String,
      default: 'Unknown',
    },
    icon: String,
    state: String,
  },
  mounted() {
    this.refresh()
  },
  computed: {
    ...mapState({
      all(state) {
        return state[this.state].all
      },
    }),
  },
  methods: {
    refresh() {
      this.$store.dispatch(`${this.state}/refresh`)
    },
    navigateTo(id) {
      this.$router.push({ path: `/${this.state}/${encodeURIComponent(id)}` })
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

.topic {
  &__item {
    display: flex;
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
    width: 100%;

    @media only screen and (min-width: 640px) {
      width: calc(50% - 1em);
    }

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }

    // &:nth-child(even) {
    //   flex-direction: row-reverse;
    // }

    &.--hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    &__title {
      font-size: 2.4em;
      margin: 0;
      font-weight: 500;
      margin-right: 1em;
      font-weight: 700;
    }
    &__count {
      font-size: 2.4em;
      margin: 0;
      font-weight: 500;
      display: flex;
      flex-direction: column;
      align-items: center;

      &__label {
        font-size: 0.7em;
      }
      &__sum {
        font-size: 1em;
        font-weight: 700;
      }
    }
  }
}
.topics {
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

  &__list {
    width: 100%;
    display: flex;
    font-size: 0.6em;
    justify-content: space-between;
    flex-direction: column;

    @media only screen and (min-width: 640px) {
      flex-wrap: wrap;
      flex-direction: row;
      font-size: 0.8em;
    }
  }
}
</style>

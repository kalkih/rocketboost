<template>
  <div class="the-search-screen">
    <div class="the-search-screen__container">
      <span>What are you looking for?</span>
      <form v-if="!loading" @submit.prevent="search">
        <input
          type="text"
          autofocus
          ref="search"
          v-model="searchString"
          @keyup.enter="search"
          @keyup.esc="setSearch(false)"
        />
      </form>
      <span v-else class="spinner"></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheSearchScreen',
  data() {
    return {
      state: 'search',
      searchString: '',
      loading: false,
    }
  },
  watch: {
    $route() {
      this.setSearch(false)
    },
  },
  methods: {
    async search() {
      const { state } = this
      this.loading = true
      await this.unsetState({ state })
      await this.getSearchResults({ state, search: this.searchString })
      this.setSearch(false)
      this.loading = false
      this.$router.push({ path: '/search/' })
    },
    ...mapActions(['setSearch']),
    ...mapActions({
      getSearchResults: 'launches/getSearchResults',
      unsetState: 'launches/unsetState',
    }),
  },
  created() {
    this.$nextTick(() => this.$refs.search.focus())
  },
}
</script>

<style scoped lang="scss">
@import '../styles/base/_spinner';

.the-search-screen {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.35s;
  z-index: 1;

  &__container {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    max-width: 980px;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 20px;
    font-size: 10vw;

    @media only screen and (min-width: 640px) {
      font-size: 5em;
    }

    span {
      display: block;
      font-size: 0.75em;
      font-weight: 600;
      letter-spacing: 0.1em;
      opacity: 0;
      animation: fade-in-1 0.25s ease-out forwards;
      margin-bottom: 1em;
    }

    .spinner {
      @extend %spinner;
      margin: 0;
      left: 0;
      right: 0;
      padding: 0.2em;
      height: 2em;

      &:after {
        left: calc(50% - 0.75em);
        opacity: 1;
        border-width: 0.05em;
      }
    }

    form {
      animation: fade-in-1 0.25s ease-out forwards;
      opacity: 0;
      animation-delay: 0.15s;
    }

    input {
      font-size: inherit;
      color: var(--primary-text-color);
      background: transparent;
      outline: none;
      border: 0;
      display: block;
      width: 100%;
      text-align: center;
      letter-spacing: 0.1em;
      font-weight: 300;
      border-radius: var(--border-radius);
      padding: 0.2em;
      background: var(--search-input-background);

      &:focus {
        background: var(--search-input-background--focus);
      }
    }
  }
  @keyframes fade-in-1 {
    0% {
      opacity: 0;
      transform: translate3d(0, 25px, 0);
    }
    100% {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fade-in-2 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
}
</style>

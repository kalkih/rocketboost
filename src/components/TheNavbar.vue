<template>
  <header class="the-navbar">
    <div class="the-navbar__background" :style="{ opacity }"></div>
    <div class="the-navbar__container">
      <a class="the-navbar__back" v-if="isNested" @click="$router.go(-1)" v-touch-feedback>
        <font-awesome-icon icon="chevron-left" />
      </a>
      <router-link to="/" @click.native="reset()" v-touch-feedback>
        <h1 class="the-navbar__title" :class="{ '--nested': isNested }">{{ title }}</h1>
      </router-link>
      <button-row class="the-navbar__trending">
        <base-button v-for="{ tag, route } in TOP_TAGS" :key="tag" :text="tag" :link="route" />
      </button-row>
      <nav class="the-navbar__nav">
        <font-awesome-icon
          :icon="search ? 'times' : 'search'"
          class="search"
          :class="{ active: search }"
          @click="toggleSearch"
          v-touch-feedback
        />
        <font-awesome-icon
          :icon="menu ? 'times' : 'bars'"
          :class="{ active: menu }"
          @click="toggleMenu"
          v-touch-feedback
        />
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ButtonRow from './ButtonRow'
import BaseButton from './BaseButton'

const NAVBAR_SCROLL_THRESHOLD = 60

const TOP_TAGS = [
  { tag: '#SpaceX', route: '/providers/SpaceX' },
  { tag: '#Arianespace', route: '/providers/Arianespace' },
  { tag: '#ULA', route: '/providers/United Launch Alliance' },
  { tag: '#ISRO', route: '/providers/Indian Space Research Organization' },
]

export default {
  name: 'TheNavbar',
  components: { BaseButton, ButtonRow },
  data() {
    return {
      title: process.env.VUE_APP_NAME,
      opacity: 0,
      TOP_TAGS,
    }
  },
  computed: mapState({
    search: (state) => state.searchActive,
    menu: (state) => state.menuActive,
    isNested() {
      return this.$route.path !== '/'
    },
  }),
  methods: {
    ...mapActions(['toggleMenu', 'toggleSearch', 'setSearch', 'setMenu']),
    onScroll() {
      if (window.scrollY >= NAVBAR_SCROLL_THRESHOLD) {
        this.opacity = 1
      } else {
        this.opacity = window.scrollY / NAVBAR_SCROLL_THRESHOLD
      }
    },
    reset() {
      this.setSearch(false)
      this.setMenu(false)
    },
  },
  created() {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll, { passive: true })
  },
}
</script>

<style scoped lang="scss">
.the-navbar {
  position: fixed;
  width: 100%;
  z-index: 10;
  user-select: none;
  font-size: 10px;

  @media only screen and (min-width: 640px) {
    font-size: 12px;
  }

  &__background {
    backdrop-filter: blur(5px);
    background: var(--navbar-color);
    height: 100%;
    pointer-events: none;
    position: absolute;
    width: 100%;
    z-index: -1;

    &:before {
      position: absolute;
      content: '';
      bottom: -16px;
      height: 16px;
      width: 100%;
      background: linear-gradient(to bottom, var(--shadow-color), rgba(255, 255, 255, 0));
      opacity: 0.25;
    }
  }

  &__container {
    background: none;
    padding: 1.5em;
    display: flex;
    align-items: center;
    width: 100%;
    flex-flow: row;
    justify-content: space-between;

    @media only screen and (min-width: 640px) {
      padding: 2em;
    }
  }
  &__back {
    position: absolute;
    font-size: 1.6em;
    color: var(--primary-text-color);
    cursor: pointer;
    padding: 0.2em 1em 0.2em 0;
    animation: reveal 0.2s;
    padding: 0 0.4em;
    -webkit-tap-highlight-color: transparent;

    &.--hover {
      opacity: 0.75;
    }
  }
  &__title {
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: var(--primary-text-color);
    align-self: flex-start;
    transition: transform 0.2s, opacity 0.2s;
    -webkit-tap-highlight-color: transparent;

    &.--nested {
      transform: translateX(1.4em);
    }

    &.--hover {
      opacity: 0.75;
    }
  }

  &__trending {
    > * {
      display: none;
    }
    > *:nth-child(-n + 1) {
      display: block;
    }
    @media only screen and (min-width: 480px) {
      > *:nth-child(-n + 2) {
        display: block;
      }
    }
    @media only screen and (min-width: 640px) {
      > *:nth-child(-n + 3) {
        display: block;
      }
    }
    @media only screen and (min-width: 960px) {
      > *:nth-child(-n + 4) {
        display: block;
      }
    }
  }
  &__nav {
    font-size: 2em;
    display: flex;
    align-items: center;
    justify-self: flex-end;
    -webkit-tap-highlight-color: transparent;
    margin-left: 0.6em;

    svg {
      height: 28px;
      width: 26px;
      font-size: 0.9em;
    }

    .search {
      padding: 1px;
    }
    .search.active {
      padding: 0;
    }
    > .active {
      opacity: 1;
    }

    > * {
      color: var(--primary-text-color);
      opacity: 0.75;
      margin: 0 0.4em;
      transition: opacity 0.25s;
      cursor: pointer;

      &:hover {
        opacity: 0.9;
      }

      &.router-link-exact-active {
        color: var(--primary-text-color);
        opacity: 1;
      }
    }

    @keyframes reveal {
      0% {
        transform: scaleX(0) translateZ(0);
      }
      100% {
        transform: scaleX(1) translateZ(0);
      }
    }
  }
}
</style>

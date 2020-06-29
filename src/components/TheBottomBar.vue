<template>
  <nav class="the-bottom-bar" :class="{ '--hide': hide }">
    <ul>
      <li
        class="the-bottom-bar__item"
        @click="toggleSearch"
        v-touch-feedback
        :class="{ '--active': search }"
      >
        <font-awesome-icon icon="search" v-if="!search" />
        <font-awesome-icon icon="times" v-else />
        <span>Search</span>
      </li>
      <router-link
        tag="li"
        class="the-bottom-bar__item"
        :class="{ '--inactive': search || menu }"
        to="/about"
        @click.native="navigate()"
        v-touch-feedback
      >
        <font-awesome-icon icon="building" />
        <span>Providers</span>
      </router-link>
      <router-link
        tag="li"
        class="the-bottom-bar__item --large"
        to="/"
        @click.native="navigate()"
        v-touch-feedback
      >
        <font-awesome-icon icon="rocket" />
      </router-link>
      <router-link
        tag="li"
        class="the-bottom-bar__item"
        :class="{ '--inactive': search || menu }"
        to="/subscriptions"
        @click.native="navigate()"
        v-touch-feedback
      >
        <font-awesome-icon icon="star" />
        <span>Subs</span>
      </router-link>
      <li
        class="the-bottom-bar__item"
        @click="toggleMenu"
        v-touch-feedback
        :class="{ '--active': menu }"
      >
        <font-awesome-icon icon="ellipsis-h" v-if="!menu" />
        <font-awesome-icon icon="chevron-down" v-else />
        <span>More</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const BAR_SHOW_THRESHOLD = 60

export default {
  name: 'TheBottomBar',
  data() {
    return {
      previousScrollPosition: 0,
      hide: false,
    }
  },
  computed: {
    ...mapState({
      search: (state) => state.searchActive,
      menu: (state) => state.menuActive,
    }),
    isNested() {
      return this.$route.path !== '/'
    },
  },
  methods: {
    ...mapActions(['toggleMenu', 'toggleSearch', 'setSearch', 'setMenu']),
    navigate() {
      this.reset()
    },
    onScroll() {
      if (window.innerHeight + window.scrollY > document.getElementById('app').offsetHeight - 60) {
        this.previousScrollPosition = window.scrollY
        this.hide = false
        return
      }
      if (window.scrollY > this.previousScrollPosition) {
        if (window.scrollY - this.previousScrollPosition >= BAR_SHOW_THRESHOLD) {
          this.previousScrollPosition = window.scrollY
          this.hide = true
        }
      } else {
        this.previousScrollPosition = window.scrollY
        this.hide = false
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
@import '../styles/setup/_variables';

.the-bottom-bar {
  position: fixed;
  width: 100%;
  z-index: 10;
  user-select: none;
  font-size: 10px;
  bottom: 0;
  background: var(--navbar-color);
  font-size: 1.6em;
  transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform: translateZ(0);

  ul {
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    margin: 0;
    overflow: hidden;
    padding: 0.4em;
  }

  &.--hide {
    transform: translateY(150%) translateZ(0) !important;
    will-change: transform;
  }

  &:before {
    position: absolute;
    content: '';
    top: -16px;
    height: 16px;
    width: 100%;
    background: linear-gradient(to top, var(--shadow-color), rgba(255, 255, 255, 0));
    opacity: 0.25;
  }

  &__item {
    align-items: center;
    border-radius: 60px;
    color: var(--primary-text-color);
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    min-width: 0;
    opacity: 0.5;
    padding: 0.2em;
    position: relative;
    transform-origin: center;
    transition: transform 0.15s;

    &:before {
      background: var(--ripple-color);
      border-radius: 60px;
      content: '';
      height: 150%;
      margin-left: auto;
      margin-right: auto;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      transform-origin: center;
      transform: scale(2);
      transition: opacity 0.5s, transform 0.5s;
      width: 3.5em;
    }

    span {
      font-size: 0.7em;
      margin-top: 0.2em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
    }

    &.router-link-exact-active,
    &.--active {
      opacity: 1;

      span {
        opacity: 1;
      }

      svg {
        transform: translateY(0);
      }
    }

    svg,
    &.--inactive svg {
      transform: translateY(0.4em);
      transition: transform 0.15s ease;
    }

    span,
    &.--inactive span {
      opacity: 0;
      transition: opacity 0.15s;
    }

    &.--inactive {
      opacity: 0.5;
    }

    &.--large {
      font-size: 1.6em;
      opacity: 1;

      svg {
        transform: unset;
      }

      &:before {
        height: 175%;
        width: 2.6em;
        margin-top: auto;
        margin-bottom: auto;
      }
    }

    &.--hover {
      opacity: 1;
    }

    &.--pressed {
      transform: scale(0.9);
      transition: transform 0.1s;

      &:before {
        opacity: 0.25;
        transform: scale(1.25);
        transition: opacity 0.1s, transform 0.1s;
      }
    }

    svg {
      display: block;
    }
  }
}
</style>

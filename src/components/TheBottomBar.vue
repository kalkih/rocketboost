<template>
  <nav class='the-bottom-bar' :class="{ '--hide': hide }">
    <div class="the-bottom-bar__item" @click="toggleSearch" v-touch-feedback>
      <font-awesome-icon icon="search"/>
    </div>
    <router-link class="the-bottom-bar__item" to="/" @click.native="navigate()" v-touch-feedback>
      <font-awesome-icon icon="rocket"/>
    </router-link>
    <router-link class="the-bottom-bar__item" to="/subscriptions" @click.native="navigate()" v-touch-feedback>
      <font-awesome-icon icon="star"/>
    </router-link>
    <div class="the-bottom-bar__item" @click="toggleMenu" v-touch-feedback>
      <font-awesome-icon icon="ellipsis-h"/>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const BAR_SHOW_THRESHOLD = 50

export default {
  name: 'TheBottomBar',
  data () {
    return {
      previousScrollPosition: 0,
      hide: false,
    }
  },
  computed: {
    ...mapState({
      search: state => state.searchActive,
      menu: state => state.menuActive,
    }),
    isNested () {
      return this.$route.path !== '/'
    },
  },
  methods: {
    ...mapActions([
      'toggleMenu',
      'toggleSearch',
      'setSearch',
      'setMenu',
    ]),
    navigate () {
      this.reset()
    },
    onScroll (e) {
      if (window.innerHeight + window.scrollY > document.getElementById('app').offsetHeight - 100) {
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
    reset () {
      this.setSearch(false)
      this.setMenu(false)
    },
  },
  created () {
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  destroyed () {
    window.removeEventListener('scroll', this.onScroll, { passive: true })
  },
}
</script>

<style scoped lang="scss">
  .the-bottom-bar {
    position: fixed;
    width: 100%;
    z-index: 10;
    user-select: none;
    font-size: 10px;
    bottom: 0;
    background: var(--navbar-color);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 1.6em;
    padding: .4em;
    animation: reveal-bar .25s cubic-bezier(.075, .820, .165, 1);
    transition: transform .5s cubic-bezier(.075, .820, .165, 1);

    &.--hide {
      transform: translateY(150%) !important;
    }

    &:before {
      position: absolute;
      content: '';
      top: -16px;
      height: 16px;
      width: 100%;
      background: linear-gradient(to top, var(--shadow-color), rgba(255,255,255,0));
      opacity: .25;
    }

    &__item {
      position: relative;
      color: var(--primary-text-color);
      transition: transform .15s;
      border-radius: 60px;
      padding: .6em;
      display: flex;
      transform-origin: center;
      flex: 1;
      justify-content: center;

      &:before {
        border-radius: 60px;
        content: '';
        position: absolute;
        background: var(--ripple-color);
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 0;
        width: 2.2em;
        height: 100%;
        opacity: 0;
        transition: opacity .5s, transform .5s;
        transform: scale(2);
        transform-origin: center;
        pointer-events: none;
      }

      &.--pressed {
        transform: scale(.9);
        transition: transform .1s;

        &:before {
          opacity: .25;
          transform: scale(1.25);
          transition: opacity .1s, transform .1s;
        }
      }

      svg {
        display: block;
      }
    }
    @keyframes reveal-bar {
      0% { transform: translateY(150%); }
      100% { transform: translateY(0); }
    }
  }
</style>

<template>
  <header class='the-navbar' :class="{ '--is-top': isTop }">
    <div class='the-navbar__container'>
      <a class="the-navbar__back" v-if="this.$route.path !== '/'" @click="$router.go(-1)">
        <font-awesome-icon icon="chevron-left"/>
      </a>
      <router-link to="/">
        <h1 class="the-navbar__title" v-bind:class="{ '--nested': this.$route.path !== '/' }">
          {{ title }}
        </h1>
      </router-link>
      <button-row>
        <base-button text="#SpaceX" link="/lsp/SpaceX" />
        <base-button text="#Arianespace" link="/lsp/Arianespace" />
        <base-button text="#ULA" link="/lsp/United Launch Alliance" />
        <base-button text="#ISRO" link="/lsp/Indian Space Research Organization" />
      </button-row>
      <nav class="the-navbar__nav">
        <font-awesome-icon
          :icon="search ? 'times' : 'search'"
          class="search"
          :class="{ active: search }"
          @click="toggleSearch"/>
        <font-awesome-icon
          :icon="menu ? 'times' : 'bars'"
          :class="{ active: menu }"
          @click="toggleMenu"/>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ButtonRow from './ButtonRow.vue'
import BaseButton from './BaseButton.vue'

export default {
  name: 'TheNavbar',
  components: { BaseButton, ButtonRow },
  data () {
    return {
      title: process.env.VUE_APP_NAME,
      isTop: true,
    }
  },
  computed: mapState({
    search: state => state.searchActive,
    menu: state => state.menuActive,
  }),
  methods: {
    ...mapActions([
      'toggleMenu',
      'toggleSearch',
    ]),
    handleScroll (e) {
      if (window.scrollY > 60) {
        this.isTop = false
      } else {
        this.isTop = true
      }
    },
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped lang="scss">
  .the-navbar {
    position: fixed;
    width: 100%;
    z-index: 10;
    background-color: var(--navbar-color);
    user-select: none;
    transition: background 0s, background-color .25s;
    font-size: 10px;

    @media only screen and (min-width: 640px) {
      font-size: 12px;
    }

    &.--is-top {
      background-color: transparent !important;
      transition: background .5s, background-color .25s;
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
      padding: .2em 1em .2em 0;
      animation: reveal .2s;
      padding: 0 .4em;
      -webkit-tap-highlight-color: transparent;
      transform: translateZ(0);

      &:hover {
        opacity: .75;
      }
    }
    &__title {
      margin: 0;
      font-weight: 600;
      letter-spacing: .1em;
      color: var(--primary-text-color);
      align-self: flex-start;
      transition: transform .2s, opacity .2s;
      -webkit-tap-highlight-color: transparent;

      &.--nested {
        transform: translateX(1.4em);
      }

      &:hover {
        opacity: .75;
      }
    }
    &__nav {
      font-size: 2em;
      display: flex;
      align-items: center;
      justify-self: flex-end;

      svg {
        height: 28px;
        width: 26px;
        font-size: .9em;
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
        font-weight: 700;
        color: var(--primary-text-color);
        opacity: .75;
        margin: 0 .4em;
        transition: opacity .25s;
        cursor: pointer;

        &:hover {
          opacity: .9;
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

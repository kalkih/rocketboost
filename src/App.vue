<template>
  <div id="app" :class="classes">
    <the-search-screen v-if="search"/>
    <the-menu v-if="menu"/>
    <the-navbar/>
    <main>
      <the-background/>
      <router-view :key="$route.fullPath"/>
    </main>
    <the-footer :fullscreen="menu"/>
    <the-toast-list/>
    <the-bottom-bar/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import notificationService from './services/notificationService'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import TheBottomBar from './components/TheBottomBar.vue'
import TheMenu from './components/TheMenu.vue'
import TheSearchScreen from './components/TheSearchScreen.vue'
import TheBackground from './components/TheBackground.vue'
import TheToastList from './components/TheToastList.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter,
    TheBottomBar,
    TheMenu,
    TheSearchScreen,
    TheBackground,
    TheToastList,
  },
  computed: {
    fullscreen () {
      return this.search || this.menu
    },
    ...mapState({
      theme: state => state.theme.theme,
      pageTheme: state => state.theme.pageTheme,
      search: state => state.searchActive,
      menu: state => state.menuActive,
    }),
    classes () {
      return [
        '--page-theme-' + this.pageTheme,
        {
          'menu-open': this.menu,
          'search-open': this.search,
        },
      ]
    },
  },
  methods: {
    applyTheme () {
      document.body.className = `--theme-${this.theme}`
    },
  },
  watch: {
    theme () {
      this.applyTheme()
    },
  },
  async created () {
    this.applyTheme()
    notificationService.setupNotificationWatcher()
  },
}
</script>

<style lang="scss">
@import './styles/base/_base';

#app {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 100%;

  @media only screen and (min-width: 640px) {
    .the-bottom-bar {
      display: none;
    }
  }

  .the-menu,
  .the-search-screen {
    height: calc(100% - var(--bottom-mobile-margin));

    @media only screen and (min-width: 640px) {
      height: 100%;
    }
  }

  .the-navbar__nav {
    display: none;
    @media only screen and (min-width: 640px) {
      display: block;
    }
  }

  .the-toast-list {
    margin-bottom: calc(var(--bottom-mobile-margin) + 2em);
    @media only screen and (min-width: 640px) {
      margin-bottom: 2em;
    }
  }

  .the-footer {
    margin-bottom: var(--bottom-mobile-margin);
    @media only screen and (min-width: 640px) {
      margin-bottom: 0;
    }
  }

  > footer, > main > *  {
    transition: none;
    transition: opacity .15s ease-out;
  }

  > main > .the-background {
    transition: opacity .05s;
  }

  &.menu-open,
  &.search-open {
    > main > * {
      opacity: 0;
      transition: opacity .25s;

      @media only screen and (min-width: 640px) {
        transition: opacity .25s;
      }
    }
    > main .the-background {
      opacity: calc(var(--animated-background-opacity, 1) / 2);
    }
  }

  &.search-open > footer {
    .rocket, .shadow, .clouds {
      opacity: 0;
      transition: opacity .25s;
    }
  }

  &:before, &:after {
    content: '';
    height: 100vh;
    width: 100%;
    position: fixed;
  }
  &:after {
    background: var(--background-color-gradient, none);
    z-index: -8;
  }
  &:before {
    background: var(--background-color);
    transition: background 1s;
    z-index: -9;
  }

  > main {
    flex: 1;
    position: relative;
    padding-top: 60px;
    display: flex;
    flex-flow: column;
  }

  > footer {
    position: relative;
  }
}
</style>

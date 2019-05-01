<template>
  <div id="app" :class="['--theme-' + theme, { 'menu-open': menu, 'search-open': search }]">
    <the-search-screen v-if="search" />
    <the-menu v-if="menu" />
    <the-navbar/>
    <template v-if="true">
    <main>
      <the-background/>
      <router-view :key="$route.fullPath"/>
    </main>
    <the-footer :fullscreen="menu"/>
    </template>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import TheMenu from './components/TheMenu.vue'
import TheSearchScreen from './components/TheSearchScreen.vue'
import TheBackground from './components/TheBackground.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter,
    TheMenu,
    TheSearchScreen,
    TheBackground,
  },
  computed: {
    fullscreen () {
      return this.search || this.menu
    },
    ...mapState({
      theme: state => state.theme,
      search: state => state.searchActive,
      menu: state => state.menuActive,
    }),
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700');
  @import url('https://fonts.googleapis.com/css?family=Varela+Round');
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
  }
  html {
    height: 100%;
  }
  body {
    font-family:
      'Montserrat',
      'Helvetica Neue',
      Helvetica,
      Arial,
      sans-serif;
    color: white;
    padding: 0;
    margin: 0;
    font-size: 12px;
    min-height: 100%;
    height: 100%;
    background-color: var(--surface-color);
  }
  #app {
    @extend %theme-dynamic;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    > footer, > main > *  {
      transition: none;
      transition: filter .5s;
    }

    &.menu-open,
    &.search-open {
      > main > * {
        opacity: 0;
        transition: opacity .25s, filter .5s;

        @media only screen and (min-width: 640px) {
          transition: opacity .25s;
        }
      }
      > main .the-background {
        opacity: 1;
        filter: blur(5px);
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
      background: linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,0));
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
  a {
    color: var(--accent-color);
    text-decoration: none;
    transition: opacity .2s;
    -webkit-tap-highlight-color: transparent;
  }
  h1 {
    font-weight: 500;
  }
  h2 {
    font-weight: 400;
  }
  .ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

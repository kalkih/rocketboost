<template>
  <div class='the-menu'>
    <nav>
      <ul>
        <li>
          <router-link to="/" @click.native="setMenu(false)">
            Home
          </router-link>
        </li>
        <li>
          <a href="#" to="/" @click="toggleSearch">
            Search
          </a>
        </li>
        <li>
          <router-link to="/about">
            About
          </router-link>
        </li>
      </ul>
    </nav>
    <the-theme-switch/>
  </div>
</template>

<script>
import TheThemeSwitch from './TheThemeSwitch'
import { mapActions } from 'vuex'
export default {
  name: 'TheMenu',
  components: {
    TheThemeSwitch,
  },
  watch: {
    $route (to, from) {
      this.setMenu(false)
    },
  },
  methods: {
    ...mapActions([
      'toggleSearch',
      'setMenu',
    ]),
  },
}
</script>

<style scoped lang="scss">
  .the-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: opacity .35s, width .35s;
    z-index: 9;
    overflow: hidden;

    li {
      animation: fade-in .35s ease forwards;
      opacity: 0;
      animation-delay: .15s;

      &:nth-of-type(2) {
        animation-delay: .25s;
      }
      &:nth-of-type(1) {
        animation-delay: .35s;
      }
    }
    nav {
      position: absolute;
      bottom: calc(60px + 15vw);
      width: 100%;
      height: 70%;
      font-size: 2.5em;
      font-weight: 400;
      text-align: center;
      z-index: 100;
      font-weight: 500;

      @media only screen and (min-width: 640px) {
        font-size: 4em;
        bottom: 12.5vw;
      }

      ul {
        position: relative;
        list-style: none;
        padding: 0;
        margin: 0 auto;
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;

        li {
          height: calc(1em + 25%);
          display: flex;
          justify-content: center;
          align-items: center;
          max-height: 10vh;

          @media only screen and (min-width: 640px) {
            max-height: 15vh;
          }
        }

        a {
          opacity: .75;
          color: var(--primary-text-color);

          &:hover {
            opacity: 1;
          }
          &.router-link-exact-active {
            opacity: 1;
          }
        }
      }
    }
    .the-theme-switch {
      position: absolute;
      bottom: 0;
      padding: 1.2em;
      animation: fade-in .35s ease forwards;
      animation-delay: .45s;
      opacity: 0;
    }
  }
</style>

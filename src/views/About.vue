<template>
  <div class="about">
    <div>
      <h1>
        <center>{{ name }}</center>
      </h1>
      <p>{{ name }} helps you keep track of upcoming & past rocket launches.</p>
      <small>Version {{ version }}</small>
    </div>
    <div>
      <h1>
        <center>Contact</center>
      </h1>
      <p>
        <a :href="contact">{{ contact }}</a>
      </p>
    </div>
    <div>
      <p class="--fine">
        <a href="https://github.com/kalkih/rocketboost">
          <github />Check out the source on GitHub
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import Github from '../assets/github.svg'

export default {
  name: 'about',
  components: {
    Github,
  },
  created() {
    this.$store.dispatch('theme/setPageTheme', 'moon')
  },
  destroyed() {
    this.$store.dispatch('theme/setPageTheme', 'default')
  },
  computed: {
    name: () => process.env.VUE_APP_NAME,
    contact: () => process.env.VUE_APP_CONTACT,
    version: () => process.env.VUE_APP_VERSION,
    mail() {
      return `mailto:${this.contact}`
    },
  },
}
</script>

<style lang="scss" scoped>
.about {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: column;
  width: 100%;
  min-height: 100%;
  margin-top: 80px;
  font-size: 1.25em;
  font-weight: 400;
  text-align: center;
  font-weight: 500;

  > div {
    margin: 2em;
  }

  small {
    opacity: 0.75;
  }

  h1 {
    margin: 0;
  }

  p {
    font-weight: 500;
    opacity: 1;

    &.--fine {
      font-weight: 500;
      opacity: 0.9;
      font-size: 0.8em;
    }
  }

  a {
    color: var(--primary-text-color);
    display: flex;
    flex-flow: column;

    &:hover {
      opacity: 0.75;
    }
  }

  svg {
    height: 2.5em;
    margin-bottom: 1em;
    fill: var(--primary-text-color);
    transition: opacity 0.1s ease-out;
  }
}
</style>

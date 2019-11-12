<template>
  <footer class='the-footer' :class="{ visible, scrolling, fullscreen }">
    <div class="shadow"></div>
    <rocket @click="scrollToTop" class="rocket"/>
    <div class="surface"></div>
    <div class="clouds">
      <cloud1/>
      <cloud4/>
      <cloud2/>
      <cloud3/>
      <cloud2/>
      <cloud1/>
      <cloud3/>
      <cloud4/>
    </div>
  </footer>
</template>

<script>
import Rocket from '../assets/rocket.svg'
import Cloud1 from '../assets/cloud-1.svg'
import Cloud2 from '../assets/cloud-2.svg'
import Cloud3 from '../assets/cloud-3.svg'
import Cloud4 from '../assets/cloud-4.svg'

export default {
  name: 'TheFooter',
  components: {
    Rocket,
    Cloud1,
    Cloud2,
    Cloud3,
    Cloud4,
  },
  props: {
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      visible: true,
      scrolling: false,
    }
  },
  methods: {
    visibilityChanged (isVisible) {
      this.visible = isVisible
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.scrolling = true
      setTimeout(() => {
        this.scrolling = false
      }, 2000)
    },
  },
}
</script>

<style scoped lang="scss">
  .the-footer {
    margin-top: auto;
    padding-top: 35vw;
    position: relative;

    @media only screen and (min-width: 640px) {
      padding-top: 25vw;
    }

    &.visible {
      .shadow {
        animation: shadow 15s infinite;
      }
      .rocket {
        animation: hover 15s infinite;

        &__flames {
          will-change: opacity;
          animation: flames 15s infinite;
        }
      }
      .clouds {
        > svg {
          animation: cloud 10s infinite;
        }
      }
    }

    &.scrolling,
    &.fullscreen {
      .shadow {
        animation: shadow-2 1.5s;
      }
      .rocket {
        animation: fly-up 1s ease-in forwards;
        position: fixed;
        opacity: 1 !important;

        &__flames {
          animation: none;
          opacity: 1;
        }
      }
    }

    &.fullscreen {
      .clouds {
        opacity: 0;
        transition: opacity .25s;
      }
      .rocket {
        z-index: 2;

        @media only screen and (min-width: 640px) {
          animation: fly-up 2s forwards;
        }
      }
    }

    .clouds {
      position: absolute;
      display: block;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      width: 200%;
      background: none;
      pointer-events: none;
      opacity: 1;
      svg:nth-child(n+5) { display: none; }

      @media only screen and (min-width: 640px) {
        width: 100%;
        svg:nth-child(n+5) { display: block; }
      }

      $total: 8;
      $offset: 100 / $total ;

      svg:nth-child(1) { top: 20%; }
      svg:nth-child(2) { top: 50%; }
      svg:nth-child(3) { top: 25%; }
      svg:nth-child(4) { top: 40%; }
      svg:nth-child(5) { top: 20%; }
      svg:nth-child(6) { top: 50%; }
      svg:nth-child(7) { top: 20%; }
      svg:nth-child(8) { top: 40%; }
      @for $i from 0 to $total {
        svg:nth-child(#{$i + 1}) {
          left: #{ $offset * ($i) + ($offset / $total) + '%'};
          animation-delay: #{random(5) + 's'};
          opacity: #{ (random(50) + 50) / 100 };
        }
      }

      > svg {
        position: absolute;
        width: 20vw;
        filter: drop-shadow(5px 5px 0 rgba(0,0,0,0.25));

        @media only screen and (min-width: 640px) {
          width: 10vw;
        }
      }
    }

    .shadow {
      width: 20%;
      height: 15%;
      position: absolute;
      border-radius: 100%;
      left: 0;
      right: 0;
      bottom: 8%;
      margin-left: auto;
      margin-right: auto;
      background: black;
      opacity: 0;

      @media only screen and (min-width: 640px) {
        bottom: 5%;
        width: 15%;
        height: 20%;
        max-height: 100px;
        max-width: 200px;
      }
    }
    .rocket {
      position: absolute;
      width: 15%;
      left: 0;
      right: 0;
      bottom: 6%;
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
      transition: opacity .25s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        opacity: .75;
      }

      @media only screen and (min-width: 640px) {
        width: 10%;
        max-width: 150px;
        bottom: 4%;
      }
    }

    .surface {
      display: flex;
      align-items: flex-end;
      background: var(--surface-color);
      width: 100%;
      height: 20vw;
      border-radius: 100% 100% 100% 100% / 100% 100% 0% 0%;
      transition: background .5s;

      @media only screen and (min-width: 640px) {
        height: 10vw;
        max-height: 200px;
      }
    }
    @keyframes shadow {
      0% { opacity: .5; transform: scale(1); }
      25% { opacity: .1; transform: scale(.25); }
      100% { opacity: .5; transform: scale(1); }
    }
    @keyframes cloud {
      0% { transform: translateX(0%); }
      25% { transform: translateX(10%); }
      75% { transform: translateX(-10%); }
      100% { transform: translateX(0%); }
    }
    @keyframes shadow-2 {
      0% { opacity: .75; transform: scale(1); }
      100% { opacity: 0; transform: scale(0); }
    }
    @keyframes fly-up {
      0% { transform: scale(1); }
      100% { transform: scale(2) translate3d(0, -100vh, 0); }
    }
    @keyframes flames {
      0% { opacity: 1; }
      10% { opacity: 1; }
      15% { opacity: .75; }
      20% { opacity: 1; }
      25% { opacity: 0; }
      50% { opacity: 0; }
      75% { opacity: .75; }
      95% { opacity: 0; }
      100% { opacity: 0; }
    }
    @keyframes hover {
      0% { transform: translate3d(0, 0% ,0); }
      25% { transform: translate3d(0, -55%, 0); }
      100% { transform: translate3d(0, 0%, 0); }
    }
  }
</style>

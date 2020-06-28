<template>
  <div class="the-background" :class="{ '--not-visible': false }" >
    <div class="the-background__wrapper">
      <stars />
      <div class="the-background__container">
        <bg-left />
      </div>
      <div class="the-background__container">
        <bg-right />
      </div>
    </div>
  </div>
</template>

<script>
import BgLeft from '../assets/bg-left.svg'
import BgRight from '../assets/bg-right.svg'
import Stars from '../assets/stars.svg'

export default {
  name: 'TheBackground',
  components: { BgLeft, BgRight, Stars },
  data () {
    return {
      visible: false,
    }
  },
  methods: {
    visibilityChanged (isVisible) {
      this.visible = isVisible
    },
  },
}
</script>

<style lang="scss">
  .the-background {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: -8;
    transition: opacity .25s;
    opacity: var(--animated-background-opacity, 1);

    &.--not-visible {
      .stars,
      .planet,
      .planet.--moon,
      > g {
        animation-play-state: paused;
      }
    }

    &__wrapper {
      width: 100%;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    &__container {
      width: 50%;
      margin-top: 8vw;
      animation: flow-in 2s cubic-bezier(0.075, 0.820, 0.165, 1.000);

      @media only screen and (min-width: 640px) {
        margin-top: 2vw;
      }

      @media only screen and (min-width: 1240px) {
        margin-top: 0;
      }
    }

    .stars {
      animation: stars 5s infinite;
      position: absolute;
      max-width: 90%;
      max-height: 500px;
      left: 0;
      right: 0;
      top: 20px;

      circle {
        fill: var(--yellow);
      }
    }

    svg {
      display: block;
      margin: 0 auto;
      width: 100%;
      max-width: 600px;
      position: relative;
      overflow: visible;

      @media only screen and (min-width: 1920px) {
        max-width: 750px;
      }

      .planet {
        animation: planet 20s infinite;
        animation-delay: 3s;

        &.--earth {
          animation-delay: 3s;
        }
        &.--mars {
          animation-delay: 9s;
        }
        &.--saturn {
          animation-delay: 3s;
        }
        &.--mercury {
          animation-delay: 10s;
        }
        &.--moon {
          animation: orbit 40s linear infinite;

          @keyframes orbit {
            0% {
              transform:
                rotate(0deg)
                translate3d(200px, 0, 0);
            }
            100% {
              transform:
                rotate(360deg)
                translate3d(200px, 0, 0)
                rotate(-360deg);
            }
          }
          > g {
            transform: translate(293px, 74px);
          }
        }
      }

      @keyframes planet {
        0% { transform: translateY(0); }
        25% { transform: translateY(10px); }
        50% { transform: translateY(-10px); }
        75% { transform: translateY(10px); }
        100% { transform: translateY(0); }
      }

      @keyframes stars-move {
        0% { transform: translateX(0); }
        25% { transform: translateX(10px); }
        50% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
        100% { transform: translateX(0); }
      }

      @keyframes stars {
        0% { opacity: .75; }
        25% { opacity: 1; }
        50% { opacity: .5; }
        75% { opacity: 1; }
        100% { opacity: .75; }
      }

      @keyframes flow-in {
        from {
          opacity: 0;
          transform: translate3d(0, -100%, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }
    }
  }
</style>

<script>
import LaunchCard from './LaunchCard.vue'

export default {
  extends: LaunchCard,
}
</script>

<style scoped lang="scss">
  @import '../styles/components/LaunchCard.scss';
  .launch-card {
    margin-top: 2em;
    font-size: 13px;
    max-width: 980px;
    margin: 2em auto 0 auto;
    background: none;
    box-shadow: none;
    width: auto;

    &:hover {
      background: none;
    }

    &.--placeholder {
      min-height: 400px;
      width: 100%;

      @media only screen and (min-width: 640px) {
        min-height: 395px;
      }
    }

    &__more {
      display: none;
    }
    &__title {
      margin-bottom: 1em;
      display: flex;
      flex-flow: column;
      letter-spacing: 0.1em;

      &--primary {
        margin-bottom: .2em;
        font-size: 1.2em;

        &:after {
          content: none;
        }
      }
      &--secondary {
        opacity: .9;
      }
    }
    &__description {
      margin-top: .6em;
    }
    &__desc {
      max-width: 500px;
      max-height: calc((1.2em * 5) + (.3em * 5));
      line-height: 1.5em;
      -webkit-line-clamp: 5;

      &.--hide {
        transform: unset;
        opacity: 1;
      }
    }
    &__tags {
      flex-wrap: wrap;
      max-width: 100%;
      justify-content: center;
      margin-top: 0;

      > * {
        margin: .8em;
      }
    }
    &__date {
      height: 4.2em;
      @media only screen and (min-width: 640px) {
        height: 6em;
      }

      .ticker, .tbf, .timeago {
        @media only screen and (min-width: 640px) {
          font-size: 3em;
        }
      }
    }
  }
</style>

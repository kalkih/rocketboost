<script>
import LaunchCard from './LaunchCard'

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
  width: 100%;

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
    margin-bottom: 0.8em;
    display: flex;
    flex-flow: column;
    letter-spacing: 0.1em;

    &--primary {
      margin-bottom: 0.4em;
      font-size: 1.2em;

      &:after {
        content: none;
      }
    }
  }
  &__description {
    margin: 1em 0;
  }
  &__desc {
    max-width: 500px;
    max-height: calc((1.2em * 5) + (0.3em * 5));
    line-height: 1.5em;
    -webkit-line-clamp: 5;
    opacity: 0.85;

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
    font-size: 0.9em;

    > * {
      margin: 0.8em;
    }
  }
  &__date {
    min-height: 3.4em;
    margin: 0.6em 0;
    @media only screen and (min-width: 640px) {
      min-height: 5em;
    }

    .tbd,
    .timeago {
      @media only screen and (min-width: 640px) {
        font-size: 2.4em;
      }
    }

    .ticker {
      @media only screen and (min-width: 640px) {
        font-size: 3em;
      }
    }
  }
}
</style>

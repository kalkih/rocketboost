<template>
  <div class="launch-overview-row">
    <h3 class="launch-overview-row__title" v-if="title">
      {{ title }}
    </h3>
    <div class="launch-overview-row__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaunchOverviewRow',
  props: {
    title: String,
  },
}
</script>

<style scoped lang="scss">
  .launch-overview-row {
    margin: 4em 0;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }

    &__title {
      font-size: 1.4em;
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: .075em;
      border-bottom: 1px solid var(--button-background-color);
      padding-bottom: 1em;
    }

    &__content {
      display: flex;
      justify-content: space-around;
      align-items: stretch;
      margin: 1em 0;
      flex-flow: column;

      @media only screen and (min-width: 640px) {
        flex-flow: row;
        min-width: 180px;
      }
    }
  }
</style>

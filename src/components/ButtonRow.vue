<template>
  <div class="button-row">
    <slot class="test"></slot>
  </div>
</template>

<script>
export default {
  name: 'ButtonRow',
}
</script>

<style scoped lang="scss">
  .button-row {
    display: none;
    font-size: 9px;

    > * {
      padding: .7em 1em !important;
      margin: 0 .4em;
      white-space: nowrap;
      font-weight: 500 !important;
      letter-spacing: .15em !important;
    }

    @media only screen and (min-width: 640px) {
      display: block;
      display: flex;
      justify-content: center;
      margin-right: 1em;
      margin-left: auto;

      > *:last-child {
        display: none;
      }

      @media only screen and (min-width: 960px) {
        > *:last-child {
          display: block;
        }
      }
    }
  }
</style>

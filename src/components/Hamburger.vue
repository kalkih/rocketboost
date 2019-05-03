<template>
  <div class="hamburger" :class="{ active }">
    <span class="top"></span>
    <span class="middle"></span>
    <span class="bottom"></span>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
  $height: 1em;
  $width: 1.2em;
  .hamburger {
    display: block;
    position: relative;
    height: $height;
    width: $width;
    cursor: pointer;
    transition: opacity .25s;
    overflow: hidden;
    opacity: .75;

    &:hover {
      opacity: .9;
    }

    &.active {
      opacity: 1;
    }

    span {
      background: var(--primary-text-color);
      height: $height / 6;
      width: $width;
      position: absolute;
      transition: transform .25s, opacity .25s;
      cursor: pointer;

      &:nth-of-type(2) {
        top: ($height / 2) - (($height / 6) / 2);
      }

      &:nth-of-type(3) {
        top: unset;
        bottom: 0;
      }
    }
  }
</style>

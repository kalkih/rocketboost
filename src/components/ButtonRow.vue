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
  display: flex;
  font-size: 9px;
  margin-left: auto;
  justify-content: center;

  > * {
    padding: 0.7em 1em !important;
    margin: 0 0.4em;
    white-space: nowrap;
    font-weight: 500 !important;
    letter-spacing: 0.15em !important;
  }
}
</style>

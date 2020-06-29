<template>
  <div class="launch">
    <launch-overview />
  </div>
</template>

<script>
import LaunchOverview from '../components/LaunchOverview'

export default {
  name: 'launch',
  components: {
    LaunchOverview,
  },
}
</script>

<style lang="scss" scoped>
.launch {
  align-self: center;
  max-width: 980px;
  width: 100%;
}
</style>

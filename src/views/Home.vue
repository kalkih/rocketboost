<template>
  <div class="content">
    <launch-list />
  </div>
</template>

<script>
import LaunchList from '../components/LaunchList'

export default {
  name: 'home',
  components: {
    LaunchList,
  },
  metaInfo() {
    return {
      title: process.env.VUE_APP_NAME,
      titleTemplate: '',
    }
  },
}
</script>

<template>
  <div class="launch">
    <launch-list :state="state" :icon="icon" :query="query" :title="title"/>
  </div>
</template>

<script>

import LaunchList from '../components/LaunchList.vue'

export default {
  name: 'list',
  props: {
    title: {
      type: String,
      default: 'History',
    },
    state: {
      type: String,
      default: 'home',
    },
    icon: String,
    query: Object,
  },
  components: {
    LaunchList,
  },
}
</script>

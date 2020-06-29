<template>
  <div class="the-toast-list">
    <BaseToast
      v-for="toast in toasts"
      :key="toast.id"
      :id="toast.id"
      :title="toast.title"
      :text="toast.text"
      :type="toast.type"
      :action="toast.action"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseToast from '@/components/BaseToast'

export default {
  name: 'TheToastList',
  components: { BaseToast },
  computed: {
    ...mapState({
      toasts: (state) => state.toasts.messages,
    }),
  },
}
</script>

<style scoped lang="scss">
.the-toast-list {
  position: fixed;
  display: flex;
  flex-flow: column;
  flex-wrap: nowrap;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 2em;
  z-index: 99;

  @media only screen and (min-width: 640px) {
    left: unset;
    width: auto;
    font-size: 1.2em;
  }

  .base-toast {
    margin-top: 1em;
  }
}
</style>

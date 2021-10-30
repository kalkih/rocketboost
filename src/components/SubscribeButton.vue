<template>
  <a
    class="base-button subscribe-button"
    :class="{ '--subscribed': isSubscribed }"
    @click.stop="handleClick()"
    v-touch-feedback
  >
    <font-awesome-icon v-if="isSubscribed" class="button__icon" icon="star" />
    <font-awesome-icon v-else class="button__icon" :icon="['far', 'star']" />
    <span class="button__text">{{ statusText }}</span>
  </a>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { NOTIFICATIONS_NOT_SUPPORTED, NOTIFICATION_PERMISSION_DENIED } from '@/lang/errors'

const PERMISSION = {
  GRANTED: 'granted',
  DENIED: 'denied',
  DEFAULT: 'default',
}

export default {
  name: 'SubscribeButton',
  data() {
    return {
      loading: false,
    }
  },
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    topic: {
      type: String,
      default: 'launch',
    },
    label: String,
  },
  computed: {
    ...mapState({
      isSubscribed({ subscriptions }) {
        return !!subscriptions.all.find((sub) => sub.topic === this.topic && sub.id === this.id)
      },
    }),
    statusText() {
      return this.isSubscribed ? 'Subscribed' : 'Subscribe'
    },
  },
  methods: {
    ...mapActions({
      isSubscribedTo: 'subscriptions/isSubscribedTo',
      subscribe: 'subscriptions/subscribe',
      unsubscribe: 'subscriptions/unsubscribe',
      addToast: 'toasts/add',
    }),
    async handleClick() {
      if (Notification.permission !== PERMISSION.GRANTED) {
        try {
          await this.requestPermission()
        } catch (error) {
          this.addToast({ text: NOTIFICATION_PERMISSION_DENIED })
        }
        return
      }
      const subscription = { topic: this.topic, id: this.id, label: this.label }
      this.loading = true
      try {
        if (this.isSubscribed) {
          await this.unsubscribe(subscription)
        } else {
          await this.subscribe(subscription)
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        this.addToast({ text: NOTIFICATIONS_NOT_SUPPORTED })
      }
      this.loading = false
    },
    // Should break out to notificationService
    async requestPermission() {
      if (!('Notification' in window)) {
        throw new Error('Notifications not supported in this browser')
      }
      if (Notification.permission !== PERMISSION.GRANTED) {
        // Check if promise based permission request is available
        if (await this.isRequestPermissionPromiseSupported()) {
          const permission = await Notification.requestPermission()
          if (permission !== PERMISSION.GRANTED) {
            throw new Error('Permission denied')
          }
          if (!('permission' in Notification)) {
            Notification.permission = permission
          }
          return this.handleClick()
        }
        // Fallback to callback method
        Notification.requestPermission((permission) => {
          if (permission !== PERMISSION.GRANTED) {
            throw new Error('Permission denied')
          }
          if (!('permission' in Notification)) {
            Notification.permission = permission
          }
          return this.handleClick()
        })
      }
      throw new Error('Permission denied')
    },
    isRequestPermissionPromiseSupported() {
      try {
        Notification.requestPermission().then()
      } catch (_error) {
        return false
      }
      return true
    },
  },
}
</script>

<style scoped lang="scss">
@import '../styles/setup/_variables';
@import '../styles/base/_button';

.base-button {
  @extend %button;
  font-weight: 600;
  padding: 0.8em 1.2em;
  display: flex;

  &.--right {
    transform-origin: right;
  }

  &.--left {
    transform-origin: left;
  }

  &.--hover {
    background-color: rgba($saturn-text-color, 0.65);
  }

  &.--subscribed {
    .button__icon {
      color: $saturn-text-color;
    }

    &.--hover {
      background-color: rgba($mars-text-color, 0.5);
    }
  }

  .button__icon {
    margin-right: 0.8em;
    margin-bottom: 0.1em;
  }
}
</style>

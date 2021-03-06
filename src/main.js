import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import '@/registerServiceWorker'
import '@/polyfills'
import '@/icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueTimeago from 'vue-timeago'
import touchFeedback from './directives/touchFeedback'

Vue.use(VueTimeago, {
  locale: 'en',
})

Vue.directive('touch-feedback', touchFeedback)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

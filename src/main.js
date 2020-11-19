import Vue from 'vue'
import dayjs from 'dayjs'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

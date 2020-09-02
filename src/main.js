import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from "./router/index"
import vuetify from "./plugins/vuetify";

import currencyFilter from "./filters/currency.filter"
import dateFilter from "./filters/date.filter"

Vue.config.productionTip = false

Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

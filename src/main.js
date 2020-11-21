import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Promised } from 'vue-promised'
import Portal from 'portal-vue'

Vue.config.productionTip = false

Vue.use(Portal)
Vue.component('Promised', Promised)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

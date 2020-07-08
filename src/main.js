import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueResource from 'vue-resource'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import DGFAuth from './plugins/dgf-auth'
import DGFApi from './plugins/dgf-api'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueResource)
Vue.use(DGFAuth, {
  domain: 'dev.local:7000',
  protocol: 'http',
  // prod clientId
  clientId: '5f042561eb81ac50441d1306',
  clientSecret: '2euryav5bd2xmlB9Ho9GHaNpMIUxErnrnPC3wgZEYXxIGpsHQh',
  // demo clientId
  // clientId: '5ec80d33e7353aa3e14972e0',
  redirect: '/login'
})
Vue.use(DGFApi, {
  protocol: 'http',
  domain: 'dev.local:7000'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

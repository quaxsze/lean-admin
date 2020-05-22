import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import DGFAuth from './plugins/dgf-auth'

import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.use(DGFAuth, {
  domain: 'www.data.gouv.fr',
  clientId: '5ec7dbe6617885d96e5f9cef',
  redirect: '/login'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

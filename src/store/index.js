import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    me: ''
  },
  mutations: {
    setMe (state, me) {
      state.me = me
    }
  },
  actions: {
  },
  modules: {
  }
})

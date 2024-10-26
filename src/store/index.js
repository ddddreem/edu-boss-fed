import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      // payload 本身是一个 JSON 数据
      // 为user 赋值
      state.user = JSON.parse(payload)
      // 持久化存储，window.localStorage, 存储的数据需要为 Json 格式
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})

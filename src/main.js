import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入 element-ui: 里面包含大量组件，但是没有样式，因此需要在下面引入样式文件
import ElementUI from 'element-ui'
// 引入 Element 的主题文件/风格文件
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

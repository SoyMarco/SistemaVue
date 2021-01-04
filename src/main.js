import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL='http://192.168.100.223:3000/api'
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

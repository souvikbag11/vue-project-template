import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import './registerModule'
import './_styles.scss'

Vue.config.productionTip = false

Vue.use(VueAxios, axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
}))

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

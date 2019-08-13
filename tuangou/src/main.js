// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from	'qs'
import VueLazyLoad from 'vue-lazyload'
import { Progress,DatetimePicker } from 'mint-ui'
// import {  } from 'mint-ui'
// import 'lib-flexible/flexible'

Vue.use(VueLazyLoad)
Vue.component(Progress.name, Progress)
Vue.component(DatetimePicker.name, DatetimePicker)


Vue.prototype.qs = qs
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import 'vue2-animate/dist/vue2-animate.min.css'
import App from './App'
import router from './router'
import 'babel-polyfill'
import $ from 'jquery'
// import i18n from './i18n/i18n'
// import animate from 'animate.css'

Vue.use(ElementUI,{locale})
Vue.config.productionTip = false
Vue.config.debug=true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // i18n,
  components: { App },
  template: '<App/>'
})

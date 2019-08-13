// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import $ from 'jquery'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue,{
  msgtime: 1.5,//目前只有一项，即msg方法的默认消失时间，单位：秒s
});

Vue.config.productionTip = false
Vue.prototype.qs = qs
Vue.use(VueAxios,axios);
Vue.prototype.$ajax = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

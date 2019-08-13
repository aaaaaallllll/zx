import Vue from 'vue'
import Router from 'vue-router'
import Qiandao from '../components/qiandao/qiandao'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Qiandao',
      component: Qiandao
    },
    {
      path:'qiandao',
      name:'Qiandao',
      component:Qiandao
    }
  ]
})

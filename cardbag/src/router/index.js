import Vue from 'vue'
import Router from 'vue-router'
const Card = () => import("../components/card/card")
const Phone = () => import("../components/phone/phone")
const Jilu = () => import("../components/jilu/jilu")
const Pay =()=>import("../components/zhifu/pay")
const Ewm=()=>import('../components/ewm/ewm')
const Bindewm=()=>import('../components/ewm/bindewm')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'card',
      component:Bindewm
    },
    {
      path: '/card',
      name: 'card',
      component: Card
    },
    {
      path: '/phone/:openid/:companyCode',
      name: 'phone',
      component: Phone
    },
    {
      path: '/jilu/:cardNo/:companyCode',
      name: 'jilu',
      component: Jilu
    },
    {
      path:'/pay/:openid/:companyCode/:cardNo/:balance/:cardType/:jiFen',
      name:'pay',
      component:Pay
    },
    {
      path:'ewm',
      name:'ewm',
      component:Ewm
    },
    {
      path:'bindewm',
      name:'bindewm',
      component:Bindewm
    }
  ]
})

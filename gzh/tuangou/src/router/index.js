import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const Shop = () => import ('../pages/shop/shop')
// const Detail = () => import ('../pages/Detail/Detail')
import Detail from '../pages/Detail/Detail'
import Pay from '../pages/pay/pay'
import Home from '../pages/home/home'
import VipPay from '../pages/vipPay/vipPay'
// import Bargain from '../pages/bargain/bargain'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/vippay',
      name: 'VipPay',
      component: VipPay
    }
  ]
})

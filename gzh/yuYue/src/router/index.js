import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tech from '../pages/tech/tech'
import Food from '../pages/food/food'
import Bath from '../pages/bath/bath'
import TeaRoom from '../pages/teaRoom/teaRoom'
import SpaRoom from '../pages/spaRoom/spaRoom'
import BoxRoom from '../pages/boxRoom/boxRoom'
import Order from '../components/order/order'
import Select from '../pages/select/select'
import Select2 from '../pages/select/select2'


Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Tech',
      component: Tech
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/tech',
      name: 'Tech',
      component: Tech
    },
    {
      path: '/food',
      name: 'Food',
      component: Food
    },
    {
      path: '/bath',
      name: 'Bath',
      component: Bath
    },
    {
      path: '/tearoom',
      name: 'TeaRoom',
      component: TeaRoom
    },
    {
      path: '/sparoom',
      name: 'SpaRoom',
      component: SpaRoom
    },
    {
      path: '/boxroom',
      name: 'BoxRoom',
      component: BoxRoom
    },
    {
      path: '/select',
      name: 'Select',
      component: Select,
      meta:{
        showFooter: true
      }
    },
    {
      path: '/select2',
      name: 'Select2',
      component: Select2,
      meta:{
        showFooter: true
      }
    }

  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/login'
import Home from '../pages/home/home'
import BoxGl from '../pages/home/boxGl/boxGl'
import SourceGl from '../pages/home/sourceGl/sourceGl'
import AgentGl from '../pages/home/agentGl/agentGl'
import ChangePass from '../pages/home/changePass/changePass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[{
          path: '/box',
          component: BoxGl,
          name: 'Box',
        },
        {
          path: '/changepass',
          component: ChangePass,
          name: 'Box',
        },
        {
          path: '/source',
          component: SourceGl,
          name: 'Box',
        },
        {
          path: '/agent',
          component: AgentGl,
          name: 'Box',
        },],
    redirect:'/box'
    }
  ]
})

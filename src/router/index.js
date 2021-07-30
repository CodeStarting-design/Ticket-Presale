import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainView from '../views/BackMainView.vue'
import EchartsView from '../views/ChartsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/loginview'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/backmainview',
    name:'backmainView',
    component:MainView,
    children:[
      {
        path:'/echartsview',
        name:'EchartsView',
        component:EchartsView
      }
    ]
  },
  {
    path:'/loginview',
    name:'LoginView',
    component:LoginView
  },
  {
    path:'/registerview',
    name:'RegisterView',
    component:RegisterView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

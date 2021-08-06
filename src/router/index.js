import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/BackMainView.vue'
import EchartsView from '../views/ChartsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserListView from '../views/userView/UserListView.vue'
import ResetPass from '../views/userView/ResetPassView.vue'
import AddUser from '../views/userView/AddUserView.vue'
import FlightList from '../views/flightView/FlightListView.vue'
import FlightInfo from '../views/flightView/FlightInfoView.vue'
import AddFlight from '../views/flightView/AddFlightView.vue'
import BillList from '../views/billView/BillListView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/loginview'
  },
  {
    path:'/backmainview',
    name:'backmainView',
    component:MainView,
    meta: { requireAuth: true },
    children:[
      {
        path:'/echartsview',
        name:'EchartsView',
        component:EchartsView,
        meta: { requireAuth: true },
      },
      {
        path:'/userlistview',
        name:'UserListView',
        component:UserListView,
        meta: { requireAuth: true },
      },
      {
        path:'/resetpassview',
        name:'ResetPassView',
        component:ResetPass,
        meta: { requireAuth: true },
      },
      {
        path:'/adduserview',
        name:'AddUserView',
        component:AddUser,
        meta: { requireAuth: true },
      },
      {
        path:'/flightlistview',
        name:'FlightListView',
        component:FlightList,
        meta: { requireAuth: true },
      },
      {
        path:'/flightinfoview',
        name:'FlightInfoView',
        component:FlightInfo,
        meta: { requireAuth: true },
      },
      {
        path:'/addflightview',
        name:'AddFlightView',
        component:AddFlight,
        meta: { requireAuth: true },
      },
      {
        path:'/billlistview',
        name:'BillListView',
        component:BillList,
        meta: { requireAuth: true },
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

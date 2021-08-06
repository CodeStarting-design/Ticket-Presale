import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo:
    { 
      adminName:'',
      adminNumber:'',
      adminPassword:''
    },
    loginState:false,
    change:false,
    screenWidth:document.documentElement.clientWidth, //屏幕宽度
    screenHeight:document.documentElement.clientHeight, //屏幕高度
  },
  mutations: {
    adminLogin(state,payload){
      state.adminInfo=payload.admin
      state.loginState=true
    },
    change(state){
      state.change=!state.change
    },
    adminLogout(state){
      state.adminInfo=null
      state.loginState=false
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistedState()]
})

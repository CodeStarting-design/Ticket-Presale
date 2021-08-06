import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import axios from 'axios'
import '@/assets/font.css'

Vue.prototype.$axios= axios
Vue.prototype.$echarts = echarts//将echarts对象加入原型链


Vue.use(ElementUI);

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){ // 判断该路由是否需要登录权限
    if (store.state.loginState===true) { 
      next();
    }
    else {
      next({
        path: '/loginview'
      })
    }
  }
  else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

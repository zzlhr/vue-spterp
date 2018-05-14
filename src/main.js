import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'  
import VueResource from "vue-resource"
import VueRouter from 'vue-router'


import UserList from './components/user/List' 
import EnterpriseList from './components/enterprise/List' 


Vue.use(ElementUI)
Vue.use(VueRouter)
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(VueResource);

const routes = [
  {
    path: '/user',
    component: UserList,
    beforeRouteEnter(to, from, next){
      next(vm =>{
          if (to === '/user/list'){
              vm.addTab('用户列表');
              // router.push('/user/list')
          }
          else if (to === '/enterprise/list'){
              vm.addTab('企业列表');
          }
      })
    },
    children: [
      {path : 'list', component: UserList},
    ]
  },
  {
    path: '/enterprise',
    component: EnterpriseList,
    children: [
      {path : 'list', component: EnterpriseList},
    ]
  }
]
const router = new VueRouter({
  routes: routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'  
import VueResource from "vue-resource"
import routes from './router/router'
import VueRouter from "vue-router";
import menu from './config/menu.js'

import UserList from './components/user/List'
import UserInfo from './components/user/info'
import EnterpriseList from './components/enterprise/List'
import Home from './components/Home'

Vue.use(VueRouter)
Vue.use(ElementUI)
const VueCookie = require('vue-cookie')
Vue.use(VueCookie)
Vue.use(VueResource)

Vue.prototype.$menu = menu;

const router = new VueRouter({routes})

const vum = new Vue({
    el: '#app',
    router,
    components:{
        'UserList': UserList,
        'UserInfo': UserInfo,
        'EnterpriseList': EnterpriseList,
        'Home': Home,
    },
    render: h => h(App)
})

export default {vum, router}

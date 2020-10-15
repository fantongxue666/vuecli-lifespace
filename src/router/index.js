import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SendForm from '@/components/SendForm'
import Login from '@/components/Login'
import Echart from '@/components/Echart'
import identify from '@/components/identify'
import Register from '@/components/Register'
import Top from '@/components/Top'
import Chat from '@/components/Chat'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题


const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/SendForm',
      name:'SendForm',
      component:SendForm
    },
    {
      path:'/',
      name:'Login',
      component:Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Echart',
      name: 'Echart',
      component: Echart
    },
    {
      path: '/identify',
      name: 'identify',
      component: identify
    },
    {
      path: '/Top',
      name: 'Top',
      component: Top
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    }
   
  ]
})

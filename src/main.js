// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueAxios from 'vue-axios'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'  //单独引入样式文件
import getMyConfig  from './assets/config'
Vue.prototype.$getMyConfig = getMyConfig;//引入配置文件
Vue.use(ElementUI)

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.use(vueAxios,axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

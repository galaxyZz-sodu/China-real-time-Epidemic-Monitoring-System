import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import './assets/css/base.css'
// 引入vant.js
import '@/plugins/vant'
Vue.config.productionTip = false

// 挂载echarts到原型上
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入swiper
import 'swiper/css/swiper.css';


// 使用开发分插件
/* import echarts from './plugins/echarts'
Vue.use(echarts) */

new Vue({
  render: h => h(App),
  data: function(){
    return {
      fromLevel: 0,
      toLevel: 0
    }
},
  router
}).$mount('#app')

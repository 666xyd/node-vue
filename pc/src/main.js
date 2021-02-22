import Vue from 'vue'
import App from './pc.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import http from './http'

Vue.config.productionTip = false;
Vue.prototype.$http = http;

//一定要写在new Vue前面
//此处的作用相当于给每一个vue都添加这个方法
Vue.mixin({
    methods: {
        getAuthHeaders(){
            return {
                Authorization: `Bearer ${localStorage.token || ''}`
            }
        }
    }
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

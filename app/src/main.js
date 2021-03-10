import Vue from 'vue'
import App from './wap.vue'
import router from './router'
import store from './store/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import http from './http.js';


Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.$http = http;
import axios from 'axios';

function getInitData(key) {
    return new Promise(function (resolve) {
        if (key === 'reset') {
            store.state.user_info = {};
            store.state.phone = null;
            resolve({});
        } else{
            axios.get(`http://localhost:3000/wap/api/rest/appUserInfo/userPhone/${localStorage.phone}`).then((res)=>{
                store.state.user_info = res.data;
                resolve(store.state[key]);
            })
        }
    });
}

//用户获取基础信息
Vue.prototype.getStore = function (key) {
    if (key === 'reset') {
        return getInitData(key)
    } else {
        // 判断是否已存储基础信息
        if (Object.keys(store.state[key]).length) {
            return new Promise(function (resolve) {
                resolve(store.state[key]);
            });
        } else {
            return getInitData(key)
        }
    }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let initState = {
    user_info: {},
    phone: null,
};

export default new Vuex.Store({
    state: initState,
    mutations: {},
})

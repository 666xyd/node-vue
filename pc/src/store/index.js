import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let initState = {
    per_num: 10,
}

export default new Vuex.Store({
  state: initState,

  modules: {}
})

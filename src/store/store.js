import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

import administrador from "./administrador/moduleAdministrador"

Vue.use(Vuex)
import moduleAuth from './auth/moduleAuth.js'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
  
export default new Vuex.Store({
    getters,
    mutations,
    state,
    actions,
    modules: {
        auth: moduleAuth,
        administrador: administrador
    },
    plugins: [vuexLocal.plugin],
  strict: process.env.NODE_ENV !== 'production'
})

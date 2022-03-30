import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import { user } from './module/user'
// import { router } from '@/store/module/router'
// import { dictionary } from '@/store/module/dictionary'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['user']
})

export const store = createStore({
  modules: {
    user,
    // router,
    // dictionary
  },
  state: {},
  mutations: {},
  plugins: [vuexLocal.plugin]
})
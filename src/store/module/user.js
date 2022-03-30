export const user =({
  namespaced: true,
  state: {
    userInfo: {},
    token: ''
  },
  mutations: {
    setToken(state, token) {
        state.token = token
    },

    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
  },
  actions: {

  },
  modules: {

  }
})
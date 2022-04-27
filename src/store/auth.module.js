export default {
  state: () => ({
    info: null,
    accessToken: null,
    isAuthProcessLoading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setInfo(state, info) {
      state.info = info;
    },
    setIsAuthProcessLoading(state, isLoadingValue) {
      state.isAuthProcessLoading = isLoadingValue;
    }
  },
  actions: {
    login() {

    },
    logout() {

    },
    refresh() {

    },
    reset() {

    },
    updateInfo() {

    }
  }
};
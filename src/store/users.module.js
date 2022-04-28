export default {
  state: () => ({
    users: []
  }),
  mutations: {
    setUsers(state, users) {
      state.users = users;
    }
  },
  actions: {
    fetchUsers({ commit }) {

    }
  },
  namespaced: true
};
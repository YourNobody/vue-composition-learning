import {useJsonPlaceholder} from '@/hooks';

export default {
  state: () => ({
    isLoading: false,
    users: []
  }),
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      commit('setIsLoading', true);
      const {getAll} = useJsonPlaceholder('/users');
      const data = await getAll();
      if (!data) return;
      setTimeout(() => {
        commit('setUsers', data);
        commit('setIsLoading', false);
      }, 1000);
    }
  },
  namespaced: true
};
import {mapGetters, mapMutations, mapActions, mapState, useStore} from 'vuex';

export const useVuex = () => {
  const store = useStore();
  const withStore = {
    $store: store
  };

  return {
    store,
    mapGetters: mapGetters.bind(withStore),
    mapActions: mapActions.bind(withStore),
    mapMutations: mapMutations.bind(withStore),
    mapState: mapState.bind(withStore),
    bind: cb => cb.bind(withStore)
  };
};